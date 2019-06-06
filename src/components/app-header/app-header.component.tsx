import React from 'react';
import './app-header.scss';
import { localization } from '../../lib/localization';

function HeaderPure(props) {
  let headerTitle = localization['title'];
  return (
    <header>
      <div>
        <a id="focus-element" className="uu-invisible" href={`${'location.pathname'}#content`} aria-hidden="true" />
      </div>
      <div id="skip-link-wrap">
        <a id="skip-link" href={`${location.pathname}#content`}>
          Hopp til hovedinnhold
        </a>
      </div>
      <div className="fdk-header">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-4">
              <a title="Link til Felles datakatalog" href="/">
                <span className="uu-invisible" aria-hidden="false" />
                <img className="fdk-logo" src="./img/logo-registrering.svg" alt="Logo for Felles datakatalog" />
              </a>
            </div>

            <div className="col-6 col-md-4 d-flex justify-content-center align-items-center">
              <span>
                <strong>{headerTitle}</strong>
              </span>
            </div>
            <div className="col-md-4 d-flex align-items-center fdk-header-text_items justify-content-end">
              {/* TODO: CurrentUser */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

//export default ReactHeader;

export const Header = HeaderPure;
