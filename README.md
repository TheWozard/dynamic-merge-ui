# Dynamic Merge UI
[![Netlify Status](https://api.netlify.com/api/v1/badges/bedbfc1c-8228-40dd-aa08-0cd6a9c6eead/deploy-status)](https://app.netlify.com/sites/thewozard-merge/deploys)
[![lint](https://github.com/TheWozard/dynamic-merge-ui/actions/workflows/lint.yml/badge.svg)](https://github.com/TheWozard/dynamic-merge-ui/actions/workflows/lint.yml)
[![test](https://github.com/TheWozard/dynamic-merge-ui/actions/workflows/test.yml/badge.svg)](https://github.com/TheWozard/dynamic-merge-ui/actions/workflows/test.yml)


A UI for interacting with the a dynamic merge process.

A continuation on the ideas learned in https://github.com/TheWozard/dynamic-distributed-merging. This aims to work on smells found during the design of the first.
- Embedding traversal information into the provided document gets really sloppy especially when higher priority documents can change that. I found myself distinguishing between behavior for  **Values** and **Object/Lists** at almost every point. This either means the abstraction was poor, or I am trying to define two different problems as one. This leads to the idea of a separate traversal document that defines how the data is traversed. In this case calling it the **Pattern Document** hence the quilting theme.
- If we want to be producing a consistent result, and we know what that is ahead of time, why do we have to traverse every document to know if we found every thing. This also supports the idea of a common json-schema like document that defines this traversal.
- While working on this idea I missed the usage of interfaces to strictly define abstractions and type checking, so this is switching to golang.
