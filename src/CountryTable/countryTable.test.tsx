import React, { createElement } from 'react'
import {shallow} from 'enzyme';

import CountryTable from './countryTable';

describe('Testing Country Table',()=>{
  
  
  const props=[{
    name: "china",
    population: 320000000,
    region: "asia",
    flag:"",
    capital:"",

}, {
    name: "india",
    population: 31000000,
    region: "asia",
    flag:"",
    capital:"",
}]
  

    it('To check Table Component is Rendered Correctly',()=>{
          expect(shallow(<CountryTable Countries={props} />)).toMatchSnapshot();
      })

      it('To Check the Div Element Heading',()=>{
          expect(shallow(<CountryTable Countries={props}/>).find('.header').render().text()).toContain('List of Countries')
      })
    
})