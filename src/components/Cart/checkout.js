import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValiduty, setFormInputValidy] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIValid = isEmpty(enteredName);
		const enteredCityIsValid = isEmpty(enteredCity);
		const enteredStreetIValid = isEmpty(enteredStreet);
		const enteredPostalCodeIValid = isFiveChar(enteredPostalCode);

		setFormInputValidy({
			name: enteredNameIValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIValid,
			street: enteredStreetIValid,
		});

		const formIsValid =
			enteredNameIValid &&
			enteredCityIsValid &&
			enteredStreetIValid &&
			enteredPostalCodeIValid;
		if (!formIsValid) {
			return;
		}
	};

	const nameControlClasses = `${classes.control} ${
		formInputValiduty.name ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputValiduty.city ? "" : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		formInputValiduty.postalCode ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputValiduty.street ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
