import { useContext, useState } from "react";
import { Alert, TouchableOpacity, View, ScrollView } from "react-native";
import { Button } from "../../components/theme/button";
import { Input } from "../../components/theme/input";
import Text from "../../components/theme/text";
import { AppContext } from "../../contexts/app-context";
import { Screen } from "../../layouts/screen";
import { Colors } from "../../utils/constants";
import { post } from "../../utils/http";
import { validate } from "../../utils/validator";

export default function RegisterScreen({ navigation }) {
	const [names, setFullNames] = useState("");
	const [phone, setPhone] = useState("");
	const [nid, setNid] = useState("");
	const [address, setAdress] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [category, setCategory] = useState("");
	

	async function register() {
		let data = { names, email, phone, nid, address, password };

		let [passes, info] = validate(data, {
			names: "required",
			phone: "required",
			nid: "required",
			address: "required",
			email: "required|email",
			password: "required",
			// category: "required"
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			await post("api/users", data);

			Alert.alert("Success", "Registration Successful");
			navigation.navigate("Login");
		} catch (error) {
			console.log(error.response.data);
			Alert.alert(error.response.data, "User Already Registered");
		}
	}

	return (
		<Screen mt>
			<ScrollView style={{marginHorizontal: 15}}>
				<View
				style={{
					marginTop: 20,
				}}
			>
				<Text size={30} medium align="center" color={Colors.primary}>
					Create an account to vote!
				</Text>
			</View>
			<View style={{ marginTop: 20 }}>
				<Input label="Names" handler={setFullNames} />
				<Input label="Email" handler={setEmail} />
				<Input label="Phone Number" handler={setPhone} />
				<Input label="Address" handler={setAdress} />
				<Input label="National ID" handler={setNid} />
				<Input label="Password" handler={setPassword} password />
			</View>
			<Button title="Create" onPress={register} />
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					<Text align="center" color={Colors.primary}>
						Already Have an account ?
					</Text>
				</TouchableOpacity>
			</View>
			</ScrollView>
			
		</Screen>
	);
}
