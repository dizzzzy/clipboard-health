# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.


## Ticket #1 
### Implementation Details:
  Pretty self-explanatory for the most part. Make sure that facilityAgentId is able to be NULL. We will need to save the value as NULL that when a facility "deletes" the custom id from an agent.

### Acceptance Criteria:
A Junction table called FacilitiesAgents that contains the following fields:
  - id (primary key automatically generated)
  - facilityId (foreign key)
  - agentId (foreign key)
  - facilityAgentId

### Time Estimate: 1 hour
<br>

## Ticket #2 
### Implementation Details:
Make a UI page that allows for facilities to create, read, update and delete their own custom ids for each agent that they work with. They will also be able to read and select an agent to add a custom id, so the page needs to be able to read all agents by facility. I will assume that the API for reading agents by facility exists.

### Acceptance Criteria:
User story: As a facility, I want to view a search field to type a name or id to **read** the agent's custom id. 

  Scenario 1: User or users exist with that search criteria
  - Search starts once a facility user begins typing in the search field.
  - Table updates according to the list of agents resulting from the search.
  - Facility user can view agents' custom id cells associated with the search terms.

  Scenario 2: User or users exist with that search criteria
  - Search starts once a facility user begins typing in the search field.
  - Table is replaced with a text saying: "No agents have been found. Please make sure that the correct name or id has been searched."


User story: As a facility, I want to use a search field to type a name or id to find the agent that I want to **create** a custom id for.
  - Scenario: Search returns a list of agents.
    - Search starts once a facility user begins typing in the search field.
    - Table updates according to the list of agents resulting from the search.
    - Facility user selects user custom id cell and add contents to it.
    - Facility user can't type an id longer than x symbols or integers (based on database id type).
    - Facility user clicks on the save button that appears near agent's row.

User story: As a facility, I want to use a search field to type a name or id to find the agent and I want to **update** the custom id associated with that agent.
  Scenario: Search returns a list of agents.
  - Search starts once a facility user begins typing in the search field.
  - Table updates according to the list of agents resulting from the search.
  - Facility user selects user custom id cell and modifies the contents.
  - Facility user can't type an id longer than x symbols or integers (based on database id type)
  - Facility user clicks on the save button that appears near the agent's row.

User story: As a facility, I want to use a search field to type a name or id to find the agent and I want to **delete** the custom id associated with that agent.
  Scenario: Search returns a list of agents.
  - Search starts once a facility user begins typing in the search field.
  - Table updates according to the list of agents resulting from the search.
  - Facility user selects user custom id cell and removes the contents.
  - Facility user clicks on the save button that appears near the agent's row.

### Time Estimate: ~ 2 weeks with testing.

<br>

## Ticket #3 
Build API endpoints and business logic that will be allow facilities to create, read, update and delete their agents' custom ids:

Implementation Details:
  - Make API Gateway endpoints that verify authentication and authorization and pass the "facilityId", taken from an authentication token located in the header to the following function calls:
    - GET /facilityAgents
    - POST /facilityAgents  Request Body: {agentId, customId}
    - PUT facilityAgents  Request Body: {agentId, customId}
    - DELETE facilityAgents  Request Body: {agentId}

  - Make business logic function (lambdas or serverless functions):
    - getFacilityAgents(facilityId) -> GET API CALL
    - createFacilityAgent(facilityId, agentId, customId) -> POST API CALL
    - updateFacilityAgent(facilityId, agentId, customId) -> PUT API CALL
    - deleteFacilityAgent(facilityId, agentId) -> DELETE API CALL

Acceptance Criteria:
  - User story: Calling the facilityAgents GET API

    - Scenario 1: Making a call from a facility with a non-valid facility credential.
      - Return a 401 unauthorized status code.
    - Scenario 2: Making a call from a facility with a valid facility credential.
      - Return a list of agents and a status code 200.

  - User story: Calling the facilityAgents POST API

    - Scenario 1: Making a call from a facility with a non-valid facility credential.
      - Return a 401 unauthorized status code.
    - Scenario 2: Making a call from a facility with a valid facility credential and a non-valid agentId.
      - Return an agent with a status code 404 (Not Found).
    - Scenario 3: Making a call from a facility with a valid facility credential, valid agentId and non-empty customId.
      - Return an agent with a status code 200.


  - User story: Calling the facilityAgents PUT API
    - Scenario 1: Making a call from a facility with a non-valid facility credential.
      - Return a 401 unauthorized status code.
    - Scenario 2: Making a call from a facility with a valid facility credential and a non-valid agentId.
      - Return an agent with a status code 404 (Not Found).
    - Scenario 3: Making a call from a facility with a valid facility credential, valid agentId and non-empty customId.
      - Return an agent with a status code 200.

  - User story: Calling the facilityAgents DELETE API
    - Scenario 1: Making a call from a facility with a non-valid facility credential.
      - Return a 401 unauthorized status code.
    - Scenario 2: Making a call from a facility with a valid facility credential and non-valid agentId.
      - Return a 404 status code (Not Found).
    - Scenario 2: Making a call from a facility with a valid facility credential and a valid agentId.
      - Return a 204 status code.


Time Estimate: ~ 3-4 days with testing.


## Ticket #4 
Modify the `getShiftsByFacility` function to return all Shifts worked that quarter, including metadata, which includes the facilityAgentId, about the Agent assigned to each.

### Implementation Details:
  - This will require modifying the query performed on the databases and an additional join on the FacilitiesAgents table.
  - We will have to handle edge cases where a part of the facility's agents have custom ids while the others do not by adding an IdType `CUSTOM` or `INTERNAL` depending on the id type.

### Acceptance Criteria:
   User story: Calling the `getShiftsByFacility` function with a valid facility id
      - Return a list of shifts including the metadata of agents assigned to the shift
      - Metadata includes an id and a IdType (`CUSTOM` or `INTERNAL`)

### Time Estimate: ~ 1 day with testing.

## Ticket #5 
Modify the `generateReport` function to also return the custom ids fields if they exist, as well as their id types.

### Implementation Details:
  - The `generateReport` function has to take into account a new column for id types. The width of each column in the PDF's agent table will probably be affected and need to be recalculated.
  
### Acceptance Criteria:
  User story: Calling the `generateReport` function with a list of shifts
      - Return a properly formatted PDF containing a list of shifts including an extra column for the IdType (`CUSTOM` or `INTERNAL`)

### Time Estimate: ~ 1-2 days with testing.
