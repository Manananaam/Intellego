- reorder assessment questions? (future tier)
- lock assessments after sending to students? how should that work? (future tier)
- how does it work to edit an assessment?

1. you can change its course associations

2. you can add a question (which means adding an additional question to question db)
   #right now all questions in state are in a questions array

#the complication here is that if we just push new questions to that array, it'll be hard to tell which ones are new and need to post, which have changes and need to put, and which don't need any changes (if we care about that)

////POSSIBLE WAYS OF DOING THIS///////

#when adding a new item, give it an invalid id (with text, for instance). on submit, go through items - if anything has a valid id, just update it, and if it's an invalid id, create it in db
###potential complications - different delete logic before they're added to DB, associating fake ids with content after it's pushed to array and then new content is added, what if one is deleted--would that cause an issue with associating fake ids to text?

#have an array of existing questions, and an array of "to add" where new questions go. could also keep all info in one array, but have a separate array of to add.
###potential complications - weird to have two different arrays? could potentially complicate things if we introduce reordering questions down the line if they are rendered from two separate places

#upon updating assessment, delete all db questions associated with it previously, and create all new questions based on what is in the updated assessment
###seems extreme

#lose the submit button entirely and have people save changes on individual questions (through a popup or similar). this way, we just need to track changes on a question by question level instead of looking at the whole collection
###is this worse user experience?

DONE! 3. you can delete a question (which means deleting the question from the db) 3. you can edit a question (which means editing the question in the db)

DONE! 5. you can edit the assessment information (name of assessment)

NOTE - forget associated courses for now
