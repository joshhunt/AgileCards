import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  SegmentedControlIOS,
  Switch,
} from 'react-native';

import {
  Cell,
  Section,
  TableView,
} from 'react-native-tableview-simple';

import {
  MAX_CARD_OPTIONS,
  SEQUENCE_OPTIONS,
  COLOR_OPTIONS,
  TINT_FOR_COLOR,
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
  },
});

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = props.settings;
    this.state.maxCardChoices = MAX_CARD_OPTIONS[this.state.cardSequence];
    this.state.colorOptionsTint = TINT_FOR_COLOR[this.state.color];
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

  onColorChange = (ev) => {
    this.setSettings({
      color: COLOR_OPTIONS[ev.nativeEvent.selectedSegmentIndex],
    });
  }

  onDisplayEmojiChange = (value) => {
    this.setSettings({ displayEmoji: value });
  }

  setSettings = (newSettings) => {
    const newState = { ...newSettings };

    if (newSettings.cardSequence) {
      newState.maxCardChoices = MAX_CARD_OPTIONS[newSettings.cardSequence];
    }

    if (newSettings.color) {
      newState.colorOptionsTint = TINT_FOR_COLOR[newSettings.color];
    }

    if (newSettings.hasOwnProperty('displayEmoji')) {
      newState.displayEmoji = newSettings.displayEmoji;
    }

    this.setState(newState, this.notifyNewSettings);
  }

  notifyNewSettings = () => {
    this.props.onChange({
      cardSequence: this.state.cardSequence,
      maxCard: this.state.maxCard,
      color: this.state.color,
      displayEmoji: this.state.displayEmoji,
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

    const { cardSequence, maxCardChoices, colorOptionsTint, displayEmoji } = this.state;

    return (
      <TableView {...tableViewProps}>

        <Section label="Cards">
          {SEQUENCE_OPTIONS.map(choice => (
            <Cell style={styles.cell} value={choice.value} key={choice.value} selected={cardSequence === choice.value}>
              <Text style={styles.cellText}>{choice.label}</Text>
            </Cell>
          ))}
        </Section>

        <Section label="Largest card">
          <Cell style={styles.cell}>
            <SegmentedControlIOS
              values={maxCardChoices}
              selectedIndex={maxCardChoices.indexOf(this.props.settings.maxCard)}
              onChange={this.onMaxCardChange}
            />
          </Cell>
        </Section>

        <Section label="Color scheme">
          <Cell style={styles.cell}>
            <SegmentedControlIOS
              tintColor={colorOptionsTint}
              values={COLOR_OPTIONS}
              selectedIndex={COLOR_OPTIONS.indexOf(this.props.settings.color)}
              onChange={this.onColorChange}
            />
          </Cell>
        </Section>

        <Section label="Extras">
          <Cell style={[styles.cell, styles.splitCell]}>
            <Text style={styles.cellText}>Last card emoji</Text>
            <Switch
              value={displayEmoji}
              onValueChange={this.onDisplayEmojiChange}
            />
          </Cell>
        </Section>
      </TableView>
    );
  }
}
