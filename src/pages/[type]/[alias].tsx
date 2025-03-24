import { MenuItem } from '@/interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { TopLevelCategory, TopPageModel } from '@/interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '@/interfaces/product.interface';
import { firstLevelMenu } from '@/helpers/helpers';
import { TopPageComponent } from '@/page-components';
import { API } from '@/helpers/api';
import Head from 'next/head';

function TopPage({ firstCategory, page, products }: CourseProps) {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={page.metaDescription} />
        <meta property='og:title' content={page.metaTitle}/>
        <meta property="og:description" content={page.metaDescription}/>
        <meta property='og:type' content='article'/>
      </Head>
      <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  );
}

export default withLayout(TopPage);

/**
 * getStaticPaths - Prepares all possible paths for static generation.
 * This function fetches the list of available course pages and
 * returns them as paths for Next.js to generate at build time.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    // Fetch the menu data, which includes all available courses
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  return {
    // Create dynamic paths based on course aliases
    paths,
    fallback: true,
  };
};

/**
 * getStaticProps - Fetches data for a single course page.
 * This function runs at build time and fetches the menu, page details, and product list.
 */
export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    // Fetch the menu items for navigation
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<TopPageModel>(
      `${API.topPage.byAlias}${params.alias}`
    );

    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10,
      }
    );

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

/**
 * CourseProps - Defines the props structure for the Course component.
 * - menu: List of menu items for navigation
 * - firstCategory: The main category identifier
 * - page: Course page details including metadata
 * - products: List of related products (e.g., study materials, tools)
 */
interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
