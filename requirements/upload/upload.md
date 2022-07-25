# Upload Requirement

## Story

**As** a User <br>
**I want** the system to allow me to upload files to the IPFS <br>
**So that** I can use it on my project

### Scenario 1

**Given** a User valid API token <br>
**When** he tries to upload files <br>
**Then** the system receive and store it

### Scenario 2

**Given** a User invalid API token <br>
**When** he tries to upload files <br>
**Then** the system should aware him of the invalid API Token

### Scenario 3

**Given** a User valid or invalid API token <br>
**When** he tries to upload files <br>
**And** the internal system fails <br>
**Then** the system should aware him of the failure

## Acceptance tests

1. The system receives a HTTP Post Request.
2. The system validates the data (API token and files).
3. The system checks if the Token is valid.
4. The system store the files on the IPFS.
5. The system returns a Success HTTP Response 200, with the data (CID).

## Exception tests

### Exception - Given API Token is Invalid

1. The system returns an Error HTTP Response 403 if the given API Token is invalid.

### Exception - Invalid Data

2. The system returns an Error HTTP Response 400 if the user data is invalid (files).

### Exception - Failure on Uploading Files

3. The system returns an Error HTTP Response 500 if it fails on uploading the files.
