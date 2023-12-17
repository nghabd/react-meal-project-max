import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoadind, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const getMeals = async () => {
			const response = await fetch(
				"https://max-react-http-d63c5-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
			);
			if (!response.ok) {
				throw new Error("getting data failed");
			}
			const responseData = await response.json();
			const loadedMEals = [];
			for (const key in responseData) {
				loadedMEals.push({
					key,
					id: key,
					description: responseData[key].description,
					price: responseData[key].price,
					name: responseData[key].name,
				});
			}
			setMeals(loadedMEals);
			setIsLoading(false);
		};
		getMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoadind) {
		return <p className={classes.mealLoading}>loading ...</p>;
	}
	if (httpError) {
		return <p className={classes.httpError}>{httpError}</p>;
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
