import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  Switch,
} from 'react-native';

var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;
var Cell = TableView.Cell;

import {
  MAX_CARD_OPTIONS,
  SEQUENCE_OPTIONS,
} from './settingsValues';

const styles = StyleSheet.create({
  table: {
    flex: 1,
  },

  cell: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 12,
    paddingTop: 12,
  },

  cellText: {
    flex: 1,
    fontSize: 17,
  },

  splitCell: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = props.settings;
    this.state.maxCardChoices = MAX_CARD_OPTIONS[this.state.cardSequence];
  }

  notifyNewSettings = () => {
    this.props.onChange({
      cardSequence: this.state.cardSequence,
      maxCard: this.state.maxCard,
    })
  }

  setSettings = (newSettings) => {
    const newState = { ...newSettings };

    if (newSettings.cardSequence) {
      newState.maxCardChoices = MAX_CARD_OPTIONS[newSettings.cardSequence];
    }

    this.setState(newState, this.notifyNewSettings);
  }

  onTableViewPress = (ev) => {
    if (ev.selectedSection === 0) {
      this.setSettings({
        cardSequence: ev.value,
        maxCard: undefined,
      });
    }
  }

  onMaxCardChange = (ev) => {
    this.setSettings({
      maxCard: this.state.maxCardChoices[ev.nativeEvent.selectedSegmentIndex],
    });
  }

  render() {

    const tableViewProps = {
      style: styles.table,
      allowsToggle: true,
      allowsMultipleSelection: false,
      tableViewStyle: TableView.Consts.Style.Grouped,
      tableViewCellStyle: TableView.Consts.CellStyle.Value1,
      onPress: this.onTableViewPress,
    };

    const { cardSequence, maxCardChoices } = this.state;

    return (
      <TableView {...tableViewProps}>

        <Section label="Cards">
          {SEQUENCE_OPTIONS.map(choice => (
            <Cell style={styles.cell} value={choice.value} key={choice.value} selected={cardSequence === choice.value}>
              <Text style={styles.cellText}>{choice.label}</Text>
            </Cell>
          ))}
        </Section>

        <Section label="Largest Card">
          <Cell style={styles.cell}>
            <SegmentedControlIOS
              values={maxCardChoices}
              selectedIndex={maxCardChoices.indexOf(this.props.settings.maxCard)}
              onChange={this.onMaxCardChange}
            />
          </Cell>
        </Section>

        <Section label="Extras">
          <Cell style={[styles.cell, styles.splitCell]}>
            <Text style={styles.cellText}>Last card emoji</Text>
            <Switch />
          </Cell>
        </Section>
      </TableView>
    );
  }
}