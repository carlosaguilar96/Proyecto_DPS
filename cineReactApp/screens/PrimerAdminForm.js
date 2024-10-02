import react from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const PrimerAdminForm = ({route}) =>{

    const {change} = route.params;
    return(
        <View style={styles.center}>
            <Text>Hola</Text>
            <TouchableHighlight onPress={() => change(true)}>
                <Text>Presiona</Text>
            </TouchableHighlight>
        </View>
    )
}

export default PrimerAdminForm;
const styles = StyleSheet.create({
    center: {
  
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });