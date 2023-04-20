import { Navbar } from "@/components/navbar";
import { getDetail, TMeal } from "@/api/meals";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const param = (context.query?.id as string) || "";

  if (param !== "") {
    const response = await getDetail(param);
    return { props: { response } };
  }
  return { props: { response: {} } };
};

type Props = {
  response: TMeal | null;
};

export default function Detail(props: Props) {
  console.log(props.response);

  const arrTags = props.response?.strTags?.split(",");
  const tags = arrTags?.map((tag, i) => {
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
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-20 max-w-6xl mx-auto my-10">
        <img
          className="h-60 w-full object-cover rounded-xl mb-6"
          src={props.response?.strMealThumb}
        />
        <div className="mb-6">
          <time className="text-gray-700">
            <i className="fa-regular fa-clock mr-2"></i>20-30
          </time>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-red-700 text-3xl ">
                {props.response?.strMeal}
              </h1>
              <div className="text-orange-600">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
            <i className="fa-sharp fa-solid fa-heart text-3xl text-red-600 mr-10"></i>
          </div>

          <span>32 Reviews</span>
          <ul className="flex mt-5 gap-2">{tags}</ul>
        </div>

        <p className="max-w-[80%] mx-auto text-red-700">
          {props.response?.strInstructions}
        </p>
      </main>
    </>
  );
}
