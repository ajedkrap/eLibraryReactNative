import React, { Component } from 'react';
import {
  View, Image, Dimensions, TouchableOpacity, Text,
  SafeAreaView, ScrollView
} from 'react-native'
import {
  Container, Content, Fab, Icon, Button, Badg
} from 'native-base'

import Icon2 from 'react-native-vector-icons/FontAwesome5'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('screen').height

import Genre from './components/genre'

// import Footer from '../screens/components/footer'
// import Header from '../screens/components/header'

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { book } = this.props.route.params
    const { title, author, image, status } = book
    return (
      <Container style={{ width: deviceWidth }}>
        {/* <Header /> */}
        <View style={{ flex: 1, position: 'absolute' }}>

          <Fab
            position='topLeft'
            style={{ zIndex: 1, backgroundColor: '#2fa9e2' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name='angle-left' type='FontAwesome5' />
          </Fab>
        </View>
        <SafeAreaView  >
          <ScrollView >

            <Container style={{ marginBottom: 120 }}>
              <View style={{ flex: 6, marginBottom: 60 }}>
                <View style={{ flex: 3, backgroundColor: '#a3e2ff', elevation: 5, }}>
                  <View style={{ flex: 1, zIndex: 0, flexDirection: 'column', opacity: 0.6 }} >
                    <Image style={{ flex: 1, height: null, width: null, resizeMode: "cover" }} blurRadius={0.50} source={image} alt='book-bg' />
                  </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ height: 200, width: 140, zIndex: 2, position: 'absolute', backgroundColor: '#94d5db', elevation: 11, borderColor: 'white', borderWidth: 5, borderRadius: 12, marginTop: -50 }}>
                    <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 8 }} blurRadius={0.50} source={image} alt='book-bg' />
                  </View>
                </View>
              </View>

              <View style={{ flex: 7, paddingHorizontal: 5 }}>
                <View style={{}}>
                  <View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                      <Text style={{ display: 'flex', flexWrap: 'wrap', fontSize: 28, fontWeight: 'bold' }}>
                        {title}
                      </Text>
                    </View>
                    <View style={{ display: 'flex', flexWrap: 'wrap', paddingVertical: 5, flexDirection: 'row', justifyContent: 'center', }}>
                      <Genre name='comedy' />

                    </View>
                    <Text style={{ textAlign: 'center' }}>By {author}</Text>
                    <View style={{ marginVertical: 20, marginHorizontal: 80, }} >
                      <Button style={{ height: 50, borderRadius: 10, elevation: 2, backgroundColor: '#12e4c3', justifyContent: 'center' }}>
                        <Icon2 style={{ fontSize: 18, marginRight: 10 }} name='book-reader' color='white' />
                        <Text style={{ color: 'white', fontSize: 20 }}>Borrow</Text>
                      </Button>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text  >Status :
                      </Text>
                        {status === 'Available' ?
                          <Text style={{ marginLeft: 5, color: 'green' }}>{status}</Text> :
                          <Text style={{ marginLeft: 5, color: 'red' }}>{status}</Text>
                        }
                      </View>
                    </View>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Non quam lacus suspendisse faucibus. Mauris pharetra et ultrices neque ornare aenean euismod. Cursus in hac habitasse platea dictumst. Lectus quam id leo in. Ridiculus mus mauris vitae ultricies leo. Enim praesent elementum facilisis leo. Quam vulputate dignissim suspendisse in est ante in. Id venenatis a condimentum vitae sapien.

                      Laoreet id donec ultrices tincidunt arcu non sodales neque. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Id cursus metus aliquam eleifend mi. Sed odio morbi quis commodo odio aenean sed adipiscing. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Vestibulum morbi blandit cursus risus. Mi proin sed libero enim sed faucibus turpis. Nunc id cursus metus aliquam eleifend mi. Morbi tempus iaculis urna id volutpat lacus laoreet. Sit amet luctus venenatis lectus magna. Nisi quis eleifend quam adipiscing vitae proin. Lectus nulla at volutpat diam ut venenatis tellus in metus. Aliquet bibendum enim facilisis gravida neque. Vitae suscipit tellus mauris a diam maecenas sed. Nec dui nunc mattis enim ut. At varius vel pharetra vel turpis. Orci porta non pulvinar neque laoreet suspendisse. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Platea dictumst quisque sagittis purus sit.
                    </Text>
                  </View>


                </View>
              </View>




            </Container>
          </ScrollView>
        </SafeAreaView>
        {/* <Footer /> */}
      </Container >
    );
  }
}


