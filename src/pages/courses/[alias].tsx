import { MenuItem } from '@/interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { TopPageModel } from '@/interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '@/interfaces/product.interface';

function Course({ menu, page, products }: CourseProps) {
  return <>{products.length}</>;
}

export default withLayout(Course);

/**
 * getStaticPaths - Prepares all possible paths for static generation.
 * This function fetches the list of available course pages and
 * returns them as paths for Next.js to generate at build time.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const firstCategory = 0;

  // Fetch the menu data, which includes all available courses
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  );
  return {
    // Create dynamic paths based on course aliases
    paths: menu.flatMap((m) => m.pages.map((p) => '/courses/' + p.alias)),
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
  const firstCategory = 0;

  // Fetch the menu items for navigation
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {
      firstCategory,
    }
  );

  const { data: page } = await axios.get<TopPageModel>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`
  );

  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    {
      category: page.category,
      limit: 10,
    }
  );

  return {
    props: {
      menu,
      firstCategory,
      page,
      products,
    },
  };
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
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}
