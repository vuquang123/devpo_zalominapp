import { Category, SubCategory } from "@/types/category.types";
import { GITHUB_RAW_BASE } from "@/constants/assets";

const category01 = `${GITHUB_RAW_BASE}/category-01.png`;
const category02 = `${GITHUB_RAW_BASE}/category-02.png`;
const category03 = `${GITHUB_RAW_BASE}/category-03.png`;
const category04 = `${GITHUB_RAW_BASE}/category-04.png`;
const category05 = `${GITHUB_RAW_BASE}/category-05.png`;
const category06 = `${GITHUB_RAW_BASE}/category-06.png`;
const category07 = `${GITHUB_RAW_BASE}/category-07.png`;
const category08 = `${GITHUB_RAW_BASE}/category-08.png`;

export const mockListOfCategory: Category[] = [
  {
    id: "vietnamese",
    name: "Thiết bị",
    subCategoryIds: [
      "vietnamese-drinks",
      "vietnamese-food",
      "vietnamese-breakfast",
      "vietnamese-soup",
      "vietnamese-dessert",
      "vietnamese-snack",
      "vietnamese-vegetarian",
      "vietnamese-fastfood",
    ],
  },
  {
    id: "western",
    name: "Dịch vụ",
    subCategoryIds: [
      "western-steak",
      "western-pasta",
      "western-burger",
      "western-pizza",
      "western-salad",
      "western-breakfast",
      "western-dessert",
      "western-drinks",
    ],
  },
  {
    id: "thailand",
    name: "Phụ kiện",
    subCategoryIds: [
      "thailand-soup",
      "thailand-noodles",
      "thailand-rice",
      "thailand-salad",
      "thailand-grilled",
      "thailand-curry",
      "thailand-seafood",
      "thailand-dessert",
    ],
  },
  {
    id: "japanese",
    name: "Tin tức",
    subCategoryIds: [
      "japanese-sushi",
      "japanese-ramen",
      "japanese-rice-bowl",
      "japanese-tempura",
      "japanese-grilled",
      "japanese-noodles",
      "japanese-dessert",
      "japanese-drinks",
    ],
  },
];

export const mockListOfSubCategory: SubCategory[] = [
  // Vietnamese subcategories
  {
    id: "vietnamese-drinks",
    name: "Máy lock",
    image: category01,
  },
  {
    id: "vietnamese-food",
    name: "Quốc tế",
    image: category02,
  },
  {
    id: "vietnamese-breakfast",
    name: "iPad",
    image: category03,
  },
  {
    id: "vietnamese-soup",
    name: "Vòng quay",
    image: category04,
  },
  {
    id: "vietnamese-dessert",
    name: "Mã IMSI",
    image: category05,
  },
  {
    id: "vietnamese-snack",
    name: "Hỗ trợ",
    image: category06,
  },
  {
    id: "vietnamese-vegetarian",
    name: "Ưu đãi",
    image: category07,
  },
  {
    id: "vietnamese-fastfood",
    name: "Nổi bật",
    image: category08,
  },
  // Western subcategories
  {
    id: "western-steak",
    name: "Bít tết",
    image: category01,
  },
  {
    id: "western-pasta",
    name: "Mì Ý",
    image: category02,
  },
  {
    id: "western-burger",
    name: "Burger",
    image: category03,
  },
  {
    id: "western-pizza",
    name: "Pizza",
    image: category04,
  },
  {
    id: "western-salad",
    name: "Salad",
    image: category05,
  },
  {
    id: "western-breakfast",
    name: "Bữa sáng",
    image: category06,
  },
  {
    id: "western-dessert",
    name: "Tráng miệng",
    image: category07,
  },
  {
    id: "western-drinks",
    name: "Đồ uống",
    image: category08,
  },
  // Thailand subcategories
  {
    id: "thailand-soup",
    name: "Canh/Súp",
    image: category01,
  },
  {
    id: "thailand-noodles",
    name: "Món mì/phở",
    image: category02,
  },
  {
    id: "thailand-rice",
    name: "Cơm",
    image: category03,
  },
  {
    id: "thailand-salad",
    name: "Gỏi",
    image: category04,
  },
  {
    id: "thailand-grilled",
    name: "Món nướng",
    image: category05,
  },
  {
    id: "thailand-curry",
    name: "Cà ri",
    image: category06,
  },
  {
    id: "thailand-seafood",
    name: "Hải sản",
    image: category07,
  },
  {
    id: "thailand-dessert",
    name: "Tráng miệng",
    image: category08,
  },
  // Japanese subcategories
  {
    id: "japanese-sushi",
    name: "Sushi/Sashimi",
    image: category01,
  },
  {
    id: "japanese-ramen",
    name: "Ramen",
    image: category02,
  },
  {
    id: "japanese-rice-bowl",
    name: "Cơm đậy",
    image: category03,
  },
  {
    id: "japanese-tempura",
    name: "Tempura",
    image: category04,
  },
  {
    id: "japanese-grilled",
    name: "Món nướng",
    image: category05,
  },
  {
    id: "japanese-noodles",
    name: "Mì/Bún",
    image: category06,
  },
  {
    id: "japanese-dessert",
    name: "Tráng miệng",
    image: category07,
  },
  {
    id: "japanese-drinks",
    name: "Đồ uống",
    image: category08,
  },
];
