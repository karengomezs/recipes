import { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  getRandomMeals,
  TMeal,
  getCategories,
  TCategory,
  filterByCategory,
} from "@/api/meals";
import { Meal } from "@/components/meal";

export const getServerSideProps = async () => {
  //para obtener las 10 recetas random, me pide tener una cuenta paypal y pagar, pero puedo obtener 1 random en cada consulta
  //Lookup a selection of 10 random meals (only available to $2+ Paypal supporters)
  //www.themealdb.com/api/json/v1/1/randomselection.php
  const response = await getRandomMeals();
  const meals = new Array(10).fill(response);

  const categories = await getCategories();

  return { props: { meals, categories } };
};

type Props = { meals: TMeal[]; categories: TCategory[] };

export default function Home(props: Props) {
  const [data, setData] = useState<TMeal[] | undefined>(props.meals);

  const meals = data?.map((eachMeal, i) => {
    return <Meal key={i} eachMeal={eachMeal} />;

    // const tags = arrayTags?.map((tag) => {
    //   return (
    //     <li
    //       key={tag}
    //       className="px-2 bg-gray-200 rounded-xl flex items-baseline "
    //     >
    //       <small>{tag}</small>
    //     </li>
    //   );
    // });
    // return (
    //   <li key={i}>
    //     <div className="rounded-xl border-2">
    //       <img
    //         className="h-32 w-full object-cover rounded-t-xl"
    //         src={eachMeal.strMealThumb}
    //         alt=""
    //       />
    //       <div className="flex flex-col gap-2 p-4">
    //         <div className="flex justify-between items-center">
    //           <p className="text-red-700">{eachMeal.strMeal}</p>
    //           <i className="fa-sharp fa-solid fa-heart text-red-600"></i>
    //         </div>
    //         <div className="flex gap-4">
    //           <div className="text-orange-600">
    //             <i className="fa-solid fa-star"></i>
    //             <i className="fa-solid fa-star"></i>
    //             <i className="fa-solid fa-star"></i>
    //             <i className="fa-solid fa-star"></i>
    //             <i className="fa-solid fa-star"></i>
    //           </div>
    //           <p className="text-gray-700">32 reviews</p>
    //         </div>
    //         <div className="flex justify-between text-gray-700 mt-2">
    //           <ul className="flex gap-2">{tags}</ul>
    //           <time>
    //             <i className="fa-regular fa-clock mr-2"></i>
    //             20-30
    //           </time>
    //         </div>
    //       </div>
    //     </div>
    //   </li>
    // );
  });

  const categories = props.categories?.map((category) => {
    return (
      <li
        key={category.idCategory}
        className=" bg-gray-200 rounded-xl flex px-2 py-1 "
      >
        <button
          onClick={async () => {
            try {
              const response = await filterByCategory(category.strCategory);
              setData(response);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {category.strCategory}
        </button>
      </li>
    );
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col py-10 px-4 max-w-6xl mx-auto">
        <div className="px-10 mb-6  sm:pr-32">
          <h1 className="text-xl sm:text-4xl text-gray-700">
            &quot; People who loves to eat are always the Best People &quot;
          </h1>
          <h2 className="text-base sm:text-2xl text-end font-semibold text-orange-500">
            Julia Child
          </h2>
        </div>
        <img
          className="h-52 object-cover mb-5 rounded-xl"
          src="/mealmain.jpg"
          alt=""
        />
        <h3 className="mb-5 text-red-700 text-xl font-bold">RECETAS</h3>
        <ul className="flex flex-wrap gap-3 mb-5">{categories}</ul>
        <ul className="grid sm:grid-cols-3 lg:grid-cols-4 gap-5">{meals}</ul>
      </main>
    </>
  );
}
