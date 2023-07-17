import { useEffect, useState } from "react";
import axios from "axios";

export const Cars = () => {
  const [cars, setCars] = useState("");
  const fetchCars = () => {
    axios
      .get("http://localhost:4000/cars")
      .then((response) => {
        console.log(response);
        setCars(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div>
      <h1>Cars</h1>
      {cars &&
        cars?.map((car) => {
          return (
            <>
              <p>
                {car.make} {car.name}
              </p>
            </>
          );
        })}
    </div>
  );
};
