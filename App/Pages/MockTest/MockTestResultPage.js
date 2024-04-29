import {Text, View, StyleSheet } from "react-native";

const MockTestResultPage = ({ route }) => {
    const { score, questionsData, mockTestScore, answeredQuestions } = route.params;

    return (
        <View style={styles.container}>
            <Text>{score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});


export default MockTestResultPage;