const {updateInterface} = require('../updateDataOnPage') ;
test('test date function', () => {
    let d=new Date();
    let todayDate=new Date('2020-04-25');
    let isvalid=false;
    if(d<=todayDate)
    {
        isvalid=true;
    }
    expect(isvalid).toBe(true); // This works.
  });