import { StyleSheet, Text, View  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const MainContainer = ({children, style, ...props}) =>{
  return(
    <SafeAreaView style={styles.container}>
        <ScrollView style={[style]
        }
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={true}
        {...props}
        >
        {children}
        <StatusBar style="auto"/>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 0,
    },
    

});

export default MainContainer;