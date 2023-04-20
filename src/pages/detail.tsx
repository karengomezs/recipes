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
      <li key={tag}>
        <small>{tag}</small>
      </li>
    );
  });

  return (
    <>
      <Navbar />
      <div>
        <img src={props.response?.strMealThumb} alt="" />
        <time>20-30</time>
        <h1>{props.response?.strMeal}</h1>
        <p>estrellas</p>
        <p>corazon</p>
        <span>32 reviews</span>
        <ul>{tags}</ul>
      </div>

      <p>{props.response?.strInstructions}</p>
    </>
  );
}
