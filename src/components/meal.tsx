import Link from "next/link";
import { TMeal } from "@/api/meals";

type Props = { eachMeal: TMeal };

export function Meal({ eachMeal }: Props) {
  const arrayTags = eachMeal.strTags?.split(",");
  const tags = arrayTags?.map((tag: string) => {
    return (
      <li
        key={tag}
        className="px-2 bg-gray-200 rounded-xl flex items-baseline h-fit"
      >
        <small>{tag}</small>
      </li>
    );
  });
  return (
    <li>
      <Link href={`/detail?id=${eachMeal.idMeal}`}>
        <div className="rounded-xl border-2">
          <img
            className="h-32 w-full object-cover rounded-t-xl"
            src={eachMeal.strMealThumb}
            alt=""
          />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between items-center">
              <p className="text-red-700">{eachMeal.strMeal}</p>
              <i className="fa-sharp fa-solid fa-heart text-red-600"></i>
            </div>
            <div className="flex gap-4">
              <div className="text-orange-600">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="text-gray-700">32 reviews</p>
            </div>
            <div className="flex justify-between text-gray-700 mt-2 flex-wrap gap-2">
              <ul className="flex gap-2">{tags}</ul>
              <time>
                <i className="fa-regular fa-clock mr-2"></i>
                20-30
              </time>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
