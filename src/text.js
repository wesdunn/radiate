import {parse} from 'markdown'
import * as colors from 'material-ui/lib/styles/colors'
import Radium from 'radium'
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import fetch from './fetch'

const styles = {
  title: {
    color: colors.pink200,
    textAlign: 'center',
    '@media screen and (max-width: 600px)': {
      fontSize: '150%'
    },
    '@media screen and (min-width: 601px) and (max-width: 959px)': {
      fontSize: '160%'
    },
    '@media screen and (min-width: 960px)': {
      fontSize: '170%'
    }
  },
  body: {
    padding: '1vw',
    '@media screen and (max-width: 600px)': {
      fontSize: '150%'
    },
    '@media screen and (min-width: 601px) and (max-width: 959px)': {
      fontSize: '160%'
    },
    '@media screen and (min-width: 960px)': {
      fontSize: '170%'
    }
  }
}

@Radium
export class Text extends Component {

  constructor(props) {
    super(props)

    const {body} = this.props

    this.state = {
      text: {
        __html: body
      }
    }
  }

  componentDidMount () {
    const {file} = this.props

    if (file) {
      fetch(file, null).then(res => {
        this.setState({
          text: {
            __html: parse(res)
          }
        })
      })
    }

  }

  render () {
    const {children, file, title} = this.props
    const {text} = this.state
    const inlineText = children.props.children

    return (
      <div>
        <div style={styles.title}>{title}</div>
        <div style={styles.body}>
          {file ? <div dangerouslySetInnerHTML={text}></div> : <div>{inlineText}</div>}
        </div>
      </div>
    )
  }
}
