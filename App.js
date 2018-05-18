import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PixelRatio,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import sudoku from "sudoku";
import _ from "lodash";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: sudoku.makepuzzle()
    };
  }

  onInput(squareKey, input) {
    Keyboard.dismiss();
  }

  generateBoard() {
    let board = _.chunk(this.state.puzzle, 9);
    let rows = [];
    let squares = [];

    board.map(row => {
      let rowSeparator = rows.length == 2 || rows.length == 5 ? true : false;

      row.map(square => {
        let squareKey = rows.length + "-" + squares.length;
        let squareSeparator =
          squares.length === 2 || squares.length === 5 ? true : false;
        if (square === null) {
          squares.push(
            <View
              key={squareKey}
              style={[styles.square, squareSeparator && styles.squareSeparator]}
            >
              <TextInput
                clearTextOnFocus={true}
                keyboardType={"number-pad"}
                style={styles.textInput}
                onChangeText={input => this.onInput(squareKey, input)}
              />
            </View>
          );
        } else {
          squares.push(
            <View
              key={squareKey}
              style={[styles.square, squareSeparator && styles.squareSeparator]}
            >
              <Text style={styles.squareText}>{++square}</Text>
            </View>
          );
        }
      });
      rows.push(
        <View
          key={rows.length}
          style={[styles.row, rowSeparator && styles.rowSeparator]}
        >
          {squares}
        </View>
      );
      squares = [];
    });
    return (
      <View key={rows.length} style={styles.container}>
        {rows}
      </View>
    );
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sudoku!</Text>
        </View>
        <View style={styles.container}>{this.generateBoard()}</View>;
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    alignSelf: "center",
    width: 320,
    borderWidth: 3,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: "flex-start"
  },
  boardContainer: {
    height: 400
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    height: 40
  },
  headerText: {
    textAlign: "center",
    fontSize: 20
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  rowSeparator: {
    borderBottomWidth: 3
  },
  square: {
    flex: 1,
    justifyContent: "flex-start",
    borderWidth: 1 / PixelRatio.get(),
    height: 40
  },
  squareSeparator: {
    borderRightWidth: 2
  },
  squareText: {
    fontSize: 25,
    paddingTop: 4,
    alignSelf: "center"
  },
  textInput: {
    paddingBottom: 2,
    paddingLeft: 10,
    height: 40,
    fontSize: 25,
    backgroundColor: "rgba(0, 0, 255, .1)"
  }
});
