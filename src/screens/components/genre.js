import React from 'react';
import {
  Text, TouchableOpacity
} from 'react-native'
import {
  Badge
} from 'native-base'

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props
    return (
      <TouchableOpacity>
        <Badge info style={{ elevation: 4, margin: 5, justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>{name}</Text>
        </Badge>
      </TouchableOpacity>
    );
  }
}


export default Genre;
