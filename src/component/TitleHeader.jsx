import React from 'react';
import PropTypes from 'prop-types';

function TitleHeader({ title, subtitle }) {
  return (
    <>
      <div className="title-header text-start py-3">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="title-header__sub-title text-slate-400">{subtitle}</p>
      </div>
    </>
  );
}

TitleHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default TitleHeader;
