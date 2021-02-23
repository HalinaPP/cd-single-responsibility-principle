# Practical task repository for Module 1 - Single Responsibility Principle

```
This repository has violations of Single Responsibility Principle, discussed in the course.
You need to identify and correct them.
```

## About the Review Process

* **Merge Request (MR)** - the whole review process happens on one single MR. By that, the MR must remain _Open_ until the mentee receives their grade.
* **Multiple rounds** - Usually, mentors have to review the work of the mentee for several rounds - meaning that mentees are expected to work on the same MR until the mentor approves that. At that time, **the task's deadline counter stops.**
* **"SME review"** - after the mentor approves the MR, a new round "Subject Matter Expert review" happens. During this round, experts review the result of the refactor, communication between mentee and mentor, plagiarism, the mentor's work, and so on. It can result with additional comments on the MR that the mentee has to address. After this stage the mentee receives the grade and the practical task is considered passed.

## General Task Guidelines

* Please, **don't** change the **pipeline definition** (`.gitlab-ci.yml`).
* Please, make corrections per the principles/topics discussed so far in this course.
* The task repository may contain one or more practical tasks. Mentees are expected to complete all the tasks.
* The programming language to be used is **JavaScript**.
* **thirdparty folder** - while making changes, any files contained inside the "thirdparty" folder must not be changed. **Do not modify 'thirdparty' components.** These files are meant to provide context to the task and are not part of it.
* **Unit tests** - they are comprehensive and mentees are free to change production code in any way until tests are green. (Use `npm test` to run unit tests.)
* **Modifying unit tests** - mentess are allowed to modify unit tests only to make them compatible with their new, refactored API. Input and output (context and behavior / Arrange and Assert) of tests must be kept. Mentees should not refactor unit tests in the scope of the course.
* **Logic and behavior of the code must be preserved.**
