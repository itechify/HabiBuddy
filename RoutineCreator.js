import React, { Component } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
	Button,
	Text,
	Icon,
	View,
	TextInput,
	Subtitle,
	Tile,
	TouchableOpacity
} from "@shoutem/ui";
import Modal from "react-native-modal";

class RoutineCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenExercises: [],
			exercisesToAdd: [],
			showChooseModal: false,
			name: "ROUTINE NAME"
		};
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<TextInput
					placeholder="ROUTINE NAME"
					style={{
						fontSize: 25,
						padding: 0,
						textAlign: "center"
					}}
					onChangeText={text => this.setState({ name: text })}
				/>
				<ScrollView
					style={{
						borderWidth: 2,
						height: Dimensions.get("window").height - 300,
						marginHorizontal: 10
					}}
					contentContainerStyle={{ alignItems: "center" }}
				>
					{this.state.chosenExercises.map((key, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								let cri = this.state.chosenExercises.slice(0);
								if (cri.includes(key)) {
									cri.splice(cri.indexOf(key), 1);
								}
								this.setState({
									chosenExercises: cri
								});
							}}
						>
							<View
								styleName="horizontal"
								style={{
									alignItems: "center",
									paddingHorizontal: 5,
									borderWidth: 1,
									width: Dimensions.get("window").width - 40,
									margin: 5
								}}
							>
								<Icon
									name="minus-button"
									style={{
										fontSize: 20,
										borderWidth: 1,
										borderRadius: 2,
										marginRight: 3
									}}
								/>
								<View
									styleName="vertical"
									style={{
										margin: 5
									}}
								>
									<Subtitle
										styleName="bold"
										style={{ fontSize: 18 }}
									>
										{this.props.exercises[key].workout}
									</Subtitle>
									<Text style={{ fontSize: 12 }}>
										{this.props.exercises[key].reps}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
				<Button
					onPress={() => this.setState({ showChooseModal: true })}
					style={{ paddingTop: 10, paddingBottom: 10 }}
				>
					<Icon
						name="plus-button"
						style={{
							fontSize: 43,
							backgroundColor: "black",
							color: "white",
							borderWidth: 1,
							borderRadius: 2
						}}
					/>
				</Button>
				<Button
					styleName="secondary confirmation"
					style={{ marginTop: 10, flex: 1 }}
					onPress={() =>
						this.props.addRoutine({
							name: this.state.name,
							items: this.state.chosenExercises
						})
					}
				>
					<Text style={{ fontSize: 20 }}>
						Finish Routine Creation
					</Text>
				</Button>
				<Modal
					hideModalContentWhileAnimating={true}
					isVisible={this.state.showChooseModal}
					onBackdropPress={() => {
						this.setState({ showChooseModal: false });
					}}
					style={{
						paddingVertical: 50,
						flex: 1
					}} // makes it so modal is click-offable if lots of routines
				>
					<Tile
						style={{
							alignItems: "center",
							justifyContent: "center",
							padding: 5,
							flex: 1
						}}
					>
						<ScrollView
							style={{ flex: 1 }}
							contentContainerStyle={{ borderWidth: 2 }}
						>
							{Object.keys(this.props.exercises).map(
								(key, index) => (
									<TouchableOpacity
										key={index}
										onPress={() => {
											let rita = this.state.exercisesToAdd.slice(
												0
											);
											if (rita.includes(key)) {
												rita.splice(
													rita.indexOf(key),
													1
												);
											} else {
												rita.push(key);
											}
											this.setState({
												exercisesToAdd: rita
											});
										}}
									>
										<View
											styleName="horizontal"
											style={{
												alignItems: "center",
												paddingHorizontal: 5,
												borderWidth: 1,
												width:
													Dimensions.get("window")
														.width - 70,
												margin: 5,
												backgroundColor: this.state.exercisesToAdd.includes(
													key
												)
													? "#b0db8c"
													: "white"
											}}
										>
											<Icon
												name="plus-button"
												style={{
													fontSize: 20,
													borderWidth: 1,
													borderRadius: 2
												}}
											/>
											<View
												styleName="vertical"
												style={{
													margin: 5
												}}
											>
												<Subtitle
													styleName="bold"
													style={{ fontSize: 18 }}
												>
													{
														this.props.exercises[
															key
														].workout
													}
												</Subtitle>
												<Text style={{ fontSize: 12 }}>
													{
														this.props.exercises[
															key
														].reps
													}
												</Text>
											</View>
										</View>
									</TouchableOpacity>
								)
							)}
						</ScrollView>
						<Button
							styleName="secondary full-width"
							style={{ marginTop: 10, flex: 0.2 }}
							onPress={() => {
								this.setState({
									chosenExercises: this.state.chosenExercises.concat(
										this.state.exercisesToAdd
									),
									exercisesToAdd: [],
									showChooseModal: false
								});
							}}
						>
							<Text style={{ fontSize: 20 }}>
								Add selected workouts
							</Text>
						</Button>
					</Tile>
				</Modal>
			</View>
		);
	}
}
export default RoutineCreator;
