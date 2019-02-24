import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Customer } from '../org.namespace.pqd';
import { Vendor } from '../org.namespace.pqd';
import { Provider } from '../org.namespace.pqd';
import { constant } from '../constant';
@Injectable()
export class AuthService {
  loggedIn = false;
  isVendor = false;
  isCustomer = false;
  isProvider = false;
  jwtHelper: JwtHelper = new JwtHelper();
  private NAMESPACE_CUSTOMER = 'Customer';
  private NAMESPACE_VENDOR = 'Vendor';
  private NAMESPACE_PROVIDER = 'Provider';

  constructor(private router: Router) {
    this.loggedIn = false;
    this.isVendor = false;
    this.isCustomer = false;
    this.isProvider = false;
  }
  
  setCurrentUser(decodedUser: string) {
    this.loggedIn = true;
    this.isVendor = (decodedUser === constant.ROLE_VENDOR);
    this.isCustomer = (decodedUser === constant.ROLE_CUSTOMER);
    this.isProvider = (decodedUser === constant.ROLE_PROVIDER);
  }
  canActivate(){
    if(this.loggedIn == false){
        this.router.navigate['/Login'];
        return false;
    }else{
      return true;
    }
  }
}
