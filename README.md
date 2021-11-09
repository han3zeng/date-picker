# react-styled-date-picker

## As Package Developer

* Development (view the tool)
    * run
        1. `npm i`
        2. `npm run dev`
        3. browse `localhost:3001`
    * test
        1. `npm i`
        2. `npm run test`

* Production (build and release)
    * build and publish to npm cloud server
        1. `npm i`
        2. `npm run build`
        3. `npm run publish:customized`

## Installation
* Install the datepicker as dependency in your project
* `npm i --save react-styled-date-picker`

```js
import DatePicker from 'react-styled-date-picker';

function Foo() {
  return (
    <>
      <DatePicker
        onSelect={({ value }) => { console.log(value) }}
        initialTimestamp={new Date().getTime()},
        gap={
          datesGridGap: '5px 5px',
          monthsGridGap: '5px 5px',
          yearsGridGap: '5px 5px',
        },
      />
    </>
  )
}
```

## Properties for the DatePicker Component

### onSelect
* type: function
* Component invokes the function when the user clicks a specific date.
```js
function Foo() {
  return (
    <>
      <DatePicker
        onSelect={({ value }) => { console.log(value) }}
      />
    </>
  )
}
```

### initialTimestamp
* type: number
* When a user clicks on input, the input element and calendar dropdown will present specified initialTimestamp.

```js
function Foo() {
  return (
    <>
      <DatePicker
        initialTimestamp={new Date().getTime()},
      />
    </>
  )
}
```

### gap
* type: object
* Customize gap for date view, month view, year view in calendar dropdown

* interface
    ```js

    interface gap {
      datesGridGap: string,
      monthsGridGap: string,
      yearsGridGap: string,
    }

    ```
* example
    ```js
    function Foo() {
      return (
        <>
          <DatePicker
            gap={
              datesGridGap: '5px 5px',
              monthsGridGap: '5px 5px',
              yearsGridGap: '5px 5px',
            },
          />
        </>
      )
    }
    ```

## Browser compatibility
| Chrome | Firefox | Edge | IE |
| -- | -- | -- | -- |
| V | V | V | X |


## TO DO
* [x] test cases
* [ ] typescriptize whole project
* properties
    * [ ] customized breakpoints
    * [ ] customized font-size
    * [ ] customized input border
* optimization
    * [ ] click on outter area to close the DatePicker
    * [ ] mobile ux
