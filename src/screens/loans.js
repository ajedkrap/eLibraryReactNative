import React, { Component } from 'react';
import {
  Text, ScrollView, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity
} from 'react-native'
import {
  Container, Content, H3, Tabs, Tab, Badge, Button
} from 'native-base'

import Footer from './components/footer'
import Header from './components/header'

import saiki from '../assets/saiki.png'
import tate from '../assets/tate.jpg'
import yoza from '../assets/yoza.jpg'
import croma from '../assets/croma.jpg'

import Icon from 'react-native-vector-icons/FontAwesome5'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

const DATA = [
  {
    id: '1',
    title: 'Cromartie High School',
    author: 'Eiji Nonaka',
    status: 'Available',
    image: croma,
    loan_date: '12-12-1212',
    fav: '5'
  },
  {
    id: '2',
    title: 'Tate No Yuusha',
    author: 'Aneko Yusagi',
    status: 'Available',
    image: tate,
    loan_date: '12-12-1212',
    fav: '3'
  },
  {
    id: '3',
    title: 'Mission: Yozakura Family',
    author: 'Hitsuji Gondaira',
    status: 'Available',
    image: yoza,
    loan_date: '12-12-1212',
    fav: '4'
  },
  {
    id: '4',
    title: 'Saiki Kusuo no Psi Nan',
    author: 'Shūichi Asō',
    status: 'Available',
    image: saiki,
    loan_date: '12-12-1212',
    fav: '9'
  },
];

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header />
        <Tabs initialPage={1}>

          {/* HISTORY */}

          <Tab heading="History" textStyle={{ color: 'grey' }} tabStyle={{ backgroundColor: '#58e6e6' }} activeTabStyle={{ backgroundColor: '#4bf1f1' }}>
            <View style={{ marginVertical: 20 }}>
              <H3 style={{ textAlign: 'center' }}>
                Recently Loan
            </H3>
            </View>
            <SafeAreaView style={{ paddingBottom: 60 }}>
              {/* <ScrollView> */}
              <FlatList
                keyExtractor={item => item.id}
                data={DATA}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                    <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                      <Image source={item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                    </View>
                    <View style={{ flex: 4 }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                          {item.title}
                        </Text>
                        <Text style={{ flex: 2 }}>
                          {item.author}
                        </Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Text >
                            Date Loaned: {item.loan_date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )} />
              {/* </ScrollView> */}
            </SafeAreaView>
          </Tab>

          {/* LOANS */}

          <Tab heading="Loans" textStyle={{ color: 'grey' }} tabStyle={{ backgroundColor: '#58e6e6' }} activeTabStyle={{ backgroundColor: '#4bf1f1' }}>
            <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 20, height: 40, justifyContent: 'space-between', alignItems: "center" }}>
              <View style={{}}>
                <H3>
                  Loaned Books
              </H3>
              </View>
              <View style={{}}>
                <Button style={{ backgroundColor: 'green', borderRadius: 12, paddingHorizontal: 20 }}>
                  <Icon style={{ color: 'white', marginRight: 5 }} name='book-reader' />
                  <Text style={{ color: 'white' }}>Loans</Text>
                </Button>
              </View>
            </View>

            <SafeAreaView>
              <ScrollView >
                <FlatList
                  keyExtractor={item => item.id}
                  data={DATA}
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                      <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                        <Image source={item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                      </View>
                      <View style={{ flex: 4 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                            {item.title}
                          </Text>
                          <Text style={{ flex: 2 }}>
                            {item.author}
                          </Text>
                          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24, color: 'green' }} >
                              {item.status}
                            </Text>
                            <Button danger style={{ padding: 10, paddingVertical: 5, height: null }}>
                              <Icon color='white' name='trash' />
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  )} />
                <View style={{ alignItems: 'center' }}>
                  <Button danger style={{ padding: 5, marginVertical: 30, marginBottom: 120, height: 50, width: 130, }}>
                    <Icon style={{ color: 'white' }} name='trash' />
                    <Text style={{ color: 'white' }}>Delete All</Text>
                  </Button>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Tab>

          {/* FAVOURITES */}

          <Tab heading="Favorites" textStyle={{ color: 'grey' }} tabStyle={{ backgroundColor: '#58e6e6' }} activeTabStyle={{ backgroundColor: '#4bf1f1' }}>
            <View style={{ marginVertical: 20 }}>
              <H3 style={{ textAlign: 'center' }}>
                Recently Loan
            </H3>
            </View>

            <SafeAreaView style={{ paddingBottom: 60 }}>
              <ScrollView >
                <FlatList
                  keyExtractor={item => item.fav}
                  data={DATA}
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', flex: 1, height: 170, paddingHorizontal: 5, marginHorizontal: 5, paddingVertical: 9 }}>
                      <View style={{ flex: 2, backgroundColor: 'black', elevation: 8, zIndex: 1, marginRight: 10 }}>
                        <Image source={item.image} style={{ flex: 1, height: null, width: null, resizeMode: "cover", }} alt='loaned-books' />
                      </View>
                      <View style={{ flex: 4 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
                            {item.title}
                          </Text>
                          <Text style={{ flex: 2 }}>
                            {item.author}
                          </Text>
                          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text >
                              Loaned: {item.fav} Times
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )} />
              </ScrollView>
            </SafeAreaView>
          </Tab>
        </Tabs>
      </Container >
    );
  }
}


export default Loans;
