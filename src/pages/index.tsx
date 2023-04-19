import { Navbar } from "@/components/navbar";
import { getRandomMeals, Meal } from "@/api/meals";

export const getServerSideProps = async () => {
  //para obtener las 10 recetas random, me pide tener una cuenta paypal y pagar, pero puedo obtener 1 random en cada consulta
  //Lookup a selection of 10 random meals (only available to $2+ Paypal supporters)
  //www.themealdb.com/api/json/v1/1/randomselection.php
  const promises = new Array(10).fill(getRandomMeals());
  const response = await Promise.all(promises);

  const meals = response.map((meal) => {
    return meal.meals[0];
  });

  return { props: { response: meals } };
};

type Props = { response?: Meal[] };

export default function Home(props: Props) {
  console.log(props);

  const meals = props.response?.map((eachMeal, i) => {
    const arrayTags = eachMeal.strTags?.split(",");
    const tags = arrayTags.map((tag) => {
      return (
        <li
          key={tag}
          className="px-2 bg-gray-200 rounded-xl flex items-baseline "
        >
          <small>{tag}</small>
        </li>
      );
    });
    return (
      <div key={i} className="rounded-xl border-2">
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
          <div className="flex justify-between text-gray-700 mt-2">
            <ul className="flex gap-2">{tags}</ul>
            <time>
              <i className="fa-regular fa-clock mr-2"></i>
              20-30
            </time>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col py-10 px-20 bg-stone-100">
        <ul className="grid grid-cols-3">
          <li>
            {meals}
            {/* <div className="rounded-xl border-2">
              <img
                className="h-32 w-full object-cover rounded-t-xl"
                src="https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg"
                alt=""
              />
              <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <p className="text-red-700">Pakistani Chicken Platter</p>
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
                <div className="flex justify-between text-gray-700 mt-2">
                  <ul className="flex gap-2">
                    <li className="px-2 bg-gray-200 rounded-xl flex items-baseline ">
                      <small>Indian</small>
                    </li>
                    <li className="px-2 bg-gray-200 rounded-xl flex items-baseline ">
                      <small>Pakistani</small>
                    </li>
                  </ul>
                  <time>
                    <i className="fa-regular fa-clock mr-2"></i>
                    20-30
                  </time>
                </div>
              </div>
            </div> */}
          </li>
        </ul>
      </main>
    </>
  );
}
