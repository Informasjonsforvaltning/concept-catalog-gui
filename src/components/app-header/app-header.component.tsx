import React, { FunctionComponent } from 'react';
import './app-header.scss';
import { localization } from '../../lib/localization';
import { DropdownToggle, DropdownItem, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import { getConfig } from '../../config';
import { getUserName, logout } from '../../auth/auth-service';

export const HeaderPure: FunctionComponent = (): JSX.Element => (
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
          <div className="col-6 col-lg-4">
            <a title="Link til Felles datakatalog" href={getConfig().registrationHost}>
              <span className="uu-invisible" aria-hidden="false" />
              <img className="fdk-logo" src="./img/logo-registrering.svg" alt="Logo for Felles datakatalog" />
            </a>
          </div>

          <div className="col-4 d-none d-lg-block my-auto">
            <span>
              <div className="fdk-title-header">{localization['title']}</div>
            </span>
          </div>

          <div className="col-6 col-lg-4 d-flex align-items-center fdk-header-text_items justify-content-end">
            <UncontrolledDropdown className="d-none d-lg-inline">
              <DropdownToggle className="fdk-button-language" caret>
                Språk
              </DropdownToggle>
              <DropdownMenu right className="fdk-dropdownmenu">
                <DropdownItem>Norsk</DropdownItem>
                <DropdownItem>Nynorsk</DropdownItem>
                <DropdownItem>English</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown
              tabIndex="0"
              className="fdk-dropdown-menu d-inline d-lg-none justify-content-end text-right"
            >
              <DropdownToggle className="fdk-button fdk-button-menu" caret color="primary">
                Meny
              </DropdownToggle>

              <DropdownMenu right className="fdk-dropdownmenu">
                <DropdownItem>Konto</DropdownItem>
                <DropdownItem>Logg ut</DropdownItem>
                <DropdownItem>Norsk</DropdownItem>
                <DropdownItem>Nynorsk</DropdownItem>
                <DropdownItem>English</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown className="d-none d-lg-inline fdk-user-button">
              <DropdownToggle className="fdk-button-account fdk-user" caret>
                {getUserName()}
              </DropdownToggle>
              <DropdownMenu right className="fdk-dropdownmenu">
                <DropdownItem onClick={logout}>Logg ut</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export const Header = HeaderPure;
