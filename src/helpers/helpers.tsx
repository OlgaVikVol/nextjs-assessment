import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BookIcon from './icons/books.svg';
import ProductIcon from './icons/products.svg';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/page.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Courses',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Services',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Books',
    icon: <BookIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Products',
    icon: <ProductIcon />,
    id: TopLevelCategory.Products,
  },
];

export const priceUSD = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' $');


export const decOfNum = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}
