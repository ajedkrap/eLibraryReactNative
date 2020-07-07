import React, { Component } from 'react';
import {
  Footer, FooterTab, Button, Icon, Text
} from 'native-base'


class Footers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Footer style={{ height: 70, elevation: 2 }} >
        <FooterTab style={{ backgroundColor: 'white', borderTopColor: '#59e7f6', borderWidth: 1, }}>
          <Button vertical >
            <Icon name='search' style={{ fontSize: 30, color: '#4bf1f1' }} />
            <Text style={{ fontSize: 10, color: 'grey' }}  >Explore</Text>
          </Button>
          <Button vertical  >
            <Icon name='library-books' type='MaterialIcons' style={{ fontSize: 30, color: '#4bf1f1' }} />
            <Text style={{ fontSize: 10, color: 'grey' }}  >Books</Text>
          </Button>
          <Button vertical  >
            <Icon name='book-reader' type='FontAwesome5' style={{ fontSize: 30, color: '#4bf1f1' }} />
            <Text style={{ fontSize: 10, color: 'grey' }}  >Loans</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}


export default Footers;
