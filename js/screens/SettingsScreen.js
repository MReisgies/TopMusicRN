import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

class Cell extends React.Component{
  render(){
    return(
        <View style={styles.cell}>
          <View style={styles.contentView}>
            <Text style={[styles.whiteText, styles.boldText]}>{this.props.cellItem.name}</Text>
          </View>
        </View>
    )
  }
}

export default class App extends React.Component {
  fetchTopArtists(){
    const apiKey = "3f288eed9d9714573089926e8d262e76"
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`

    return fetch(url)
    .then(response => response.json())
  }

  constructor(props){
    super(props)

    this.state = { artists:[] }

    //fetch api data
    this.fetchTopArtists()
    .then(json => { this.setState({artists: json.artists.artist}) 
    })
  }
  render() {

    const tableData = Array(50).fill('test data')


    return ( <View style = {styles.container}>
      <FlatList 
        data={this.state.artists}
        renderItem={({item}) => (
          <Cell cellItem={item}/>
        )}
        keyExtractor={(_,index) => index.toString()}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    backgroundColor: '#000'
  },
  cell: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 5,
  },
  contentView:{
    flex: 1,
  },
  textCenter: {
    textAlign: 'center'
  },
  whiteText:{
    color: 'white',
  },
  boldText:{
    fontWeight: 'bold'
  }
});