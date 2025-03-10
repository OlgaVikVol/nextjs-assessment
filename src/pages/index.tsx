import { Button, Htag, Paragraph, Rating, Tag } from '@/components';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { JSX, useState } from 'react';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { useTranslation } from 'react-i18next';
import { API } from '@/helpers/api';

function Home({ menu}: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Htag tag="h1">Home </Htag>
        <Button appearance="primary" arrow="down">
          Add me
        </Button>
        <Paragraph size="l">Large</Paragraph>
        <Paragraph>Middle</Paragraph>
        <Paragraph size="s">Small</Paragraph>
        <Tag size="s" color="red">
          Tag
        </Tag>
        <Rating rating={rating} isEditable setRating={setRating}></Rating>
     
      </>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find,
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
