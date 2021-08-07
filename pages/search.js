import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import { format } from "date-fns";
import ItemCard from "../components/ItemCard";
import Map from "../components/map";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formatedStDate = format(new Date(startDate), "dd MMMM yy");
  const formatedEnDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatedStDate}-${formatedEnDate}`;
  //   console.log(searchResults);
  return (
    <div>
      <Header placeholder={`${location}|${range}|${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300 stays - {range} for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-500 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button"> Type of Place</p>
            <p className="button">Price</p>
            <p className="button"> Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div>
            {searchResults.map(
              ({
                img,
                location,
                title,
                description,
                total,
                price,
                long,
                lat,
                star,
              }) => (
                <ItemCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  total={total}
                  long={long}
                  price={price}
                  lat={lat}
                  star={star}
                />
              )
            )}
          </div>
        </section>
        <section className="min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
    </div>
  );
}
// context in getServersidepops and incrementServerside skeleton loader
export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: { searchResults },
  };
}
