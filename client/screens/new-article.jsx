import { Alert, ScrollView, View } from "react-native";
import { Input } from "../components/theme/input";
import { Button } from "../components/theme/button";
import Text from "../components/theme/text";
import { Screen } from "../layouts/screen";
import { useState } from "react";
import { validate } from "../utils/validator";
import { post } from "../utils/http";

export default function NewArticle({ navigation }) {
	const [names, setFullNames] = useState("");
	const [nid, setNid] = useState("");
	const [gender, setGender] = useState("");
	const [mission, setMission] = useState("");
	const [profile, setprofile] = useState("");

	async function createArticle() {
		let data = { names, nid, profile, gender, mission };

		let [passes, info] = validate(data, {
			names: "required",
			nid: "required",
			profile: "required",
			gender: "required",
			mission: "required",
		});

		if (!passes) {
			Alert.alert("Bad Request", info[0][0]);
			return;
		}

		try {
			let res = await post("api/candidates", data);

			if (res.status == 201) {
				Alert.alert("Success", "New Candidate created successfully");
				navigation.navigate("App");
			} else {
				Alert.alert("Bad Request", "Check if your fields are valid");
			}
		} catch (error) {}
	}

	return (
		<Screen>
			<ScrollView>
				<View style={{ marginTop: 20 }}>
					<Input label="Names" handler={setFullNames} />
					<Input textarea label="Mission" handler={setMission} />
					<Input label="Profile Picture" handler={setprofile} />
					<Input label="Gender" handler={setGender} />
					<Input label="National ID" handler={setNid} />
					<Button title={"Create Candidate"} onPress={createArticle} />
				</View>
			</ScrollView>
		</Screen>
	);
}
