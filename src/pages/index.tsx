import { Button, Htag, Paragraph, Rating, Tag } from '@/components';
import { withLayout } from '@/layout/Layout';
import { GetStaticProps } from 'next';
import { JSX, useState } from 'react';
import axios from 'axios';
import { MenuItem } from '@/interfaces/menu.interface';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
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
        <ul>
          {menu.map((item) => (
            <li key={item._id.secondCategory}>{item._id.secondCategory}</li>
          ))}
        </ul>
      </>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
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
