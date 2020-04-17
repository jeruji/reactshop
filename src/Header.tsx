import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "url-search-params-polyfill";
import BasketSummary from "./BasketSummary";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";

interface IProps extends RouteComponentProps {
  basketCount: number;
}

interface IState {
  search: string;
}

class Header extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      search: "",
    };
  }

  public render() {
    return (
      <header className="header">
        <div className="search-container">
          <input
            type="search"
            placeholder="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleSearchKeydown}
          />
          <BasketSummary count={this.props.basketCount} />
        </div>
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">React Shop</h1>
        <nav>
          <NavLink
            to="/products"
            className="header-link"
            activeClassName="header-link-active"
          >
            Products
          </NavLink>
          <NavLink
            to="/contactus"
            className="header-link"
            activeClassName="header-link-active"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/admin"
            className="header-link"
            activeClassName="header-link-active"
          >
            Admin
          </NavLink>
        </nav>
      </header>
    );
  }

  private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  private handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.history.push(`/products?search=${this.state.search}`);
    }
  };
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    basketCount: store.basket.products.length,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
