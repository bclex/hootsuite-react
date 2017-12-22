import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable max-len */
const STANDARD_ICONS = `
angle-down,angle-leftangle-right,angle-up,approve,assigned,assigned-on,attach,award,block,block-on,clear,comment,compose,direct-message,download,
edit,ellipsis,email,favorite-on,favorite,filter,follow,grid,heart-on,heart,like-on,like,list,location,plus,privacy,reply-all,reply,retweet,
resolved,resolved-on,rss,save,schedule,search,settings,stats,streams,tag,targeting,trash,unfollow,upgrade,upload,user,webcam
`.replace(/^\s+|\s+$/g, '').split(/[\s,]+/);

export default class Icon extends Component {
  render() {
    const { container, ...props } = this.props;
    const { icon } = props;
    if (container) {
      const Container = container || 'span';
      const { containerClassName, ...pprops } = props;
      const ccontainerClassName = classnames(containerClassName, 'hs_container');
      return (
        <Container className={ccontainerClassName} ref={(node) => { this.iconContainer = node; }}>
          <span className={`icon-app-dir x-${icon}`} { ...pprops} />;
        </Container>
      );
    }
    return <span className={`icon-app-dir x-${icon}`} { ...props} />;
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  icon: PropTypes.string,
  container: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  tabIndex: PropTypes.number,
};

Icon.ICONS = {
  STANDARD_ICONS,
};
