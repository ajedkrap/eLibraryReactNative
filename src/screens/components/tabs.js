import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux'

import Admin from '../admin'
import Dashboard from '../dashboard'
import Loans from '../loans'
import Profile from '../profile'

const BottomTab = createBottomTabNavigator();

class Tab extends Component {
  render() {
    const { isAdmin } = this.props.auth
    return (
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: '#4bf1f1',
          inactiveTintColor: '#53b4b4',
        }}
      >
        <BottomTab.Screen
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" solid color={color} size={size} />
            ),
          }}
          component={Dashboard}
          name="home"
        />
        {!isAdmin && <BottomTab.Screen
          options={{
            title: 'Loans',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book-reader" solid color={color} size={size} />
            ),
          }}
          component={Loans}
          name="loans"
        />}
        {isAdmin && <BottomTab.Screen
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-cog" solid color={color} size={size} />
            ),
          }}
          component={Admin}
          name="admin"
        />}
        <BottomTab.Screen
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" solid color={color} size={size} />
            ),
          }}
          component={Profile}
          name="profile"
        />
      </BottomTab.Navigator>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Tab)