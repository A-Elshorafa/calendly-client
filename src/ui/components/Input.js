import React, {Component} from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText(event) {
    const {onChangeText} = this.props;
    if (event && event.target && typeof onChangeText === 'function') {
      onChangeText(event.target.value);
    }
  }
  render() {
    const {
      id,
      name,
      type,
      styles,
      placeholder,
      autoComplete
    } = this.props;
    return (
      <input
        id={id}
        name={name}
        type={type}
        className={styles}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={this.handleChangeText}
      />
    );
  }
}