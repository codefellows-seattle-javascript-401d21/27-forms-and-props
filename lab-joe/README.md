
Lab 27 - forms and props


This lab was more of a great introduction to react components and how to pass data from one point to the next.

The way that attributes are passed down to the elements in the view will definitely take some getting used to. Overall, this lab took me about two hours.







Feature Tasks
Create the following components and structure them according to the following diagram

App
  SearchForm
  SearchResultList

App Component
should contain all of the application state
should contain methods for modifying the application state
the state should have a topics array for holding the results of the search
SearchForm Component
should contain a text input for the user to supply a reddit board to look up
should contain a number input for the user to limit the number of results to return
the number must be more than 0 and less than 100
onSubmit the form should make a request to reddit
it should make a get request to http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit} - NOTE: the www in www.reddit.com is very important here! You'll have CORS problems without it.
on success it should pass the results to the application state
on failure it should add a class to the form called error and turn the form's inputs borders red
SearchResultList Component
Should inherit all search results through props
This component does not need to have its own state
If there are topics in the application state it should display an unordered list
Each list item in the unordered list should contain the following
an anchor tag with a href to the topic.url
inside the anchor a heading tag with the topic.title
inside the anchor a p tag with the number of topic.ups