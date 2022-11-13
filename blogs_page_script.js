const db = firebase.firestore();
db.settings({ timestampsInSnaphsots: true });
const all_blogs = document.getElementById('all_blogs');
const write_button= document.getElementById('write_blog_button');
var summary_content_toggle = document.getElementsByClassName("summary_content_toggle");

//Create element and render blog.
function render_blog(doc)
{
    var display_content = false;
    let div = document.createElement('div');
    let title = document.createElement('h2');
    title.setAttribute('class', 'blog_heading');
    let date = document.createElement('h6');
    let category = document.createElement('h6');
    let tags = document.createElement('h6');
    let author = document.createElement('h6');
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'summary_content_toggle');
    button.setAttribute('id', doc.id);
    button.textContent = "Read More"
    author.setAttribute('class', 'author_name');
    let summary = document.createElement('p');
    summary.setAttribute('class', 'summary_content');
    let content = document.createElement('p');
    content.setAttribute('class', 'summary_content content_visibility');
    content.setAttribute('id', 'content_' + doc.id);
    //Set value for fields.
    title.textContent = doc.data().title;
    date.textContent = doc.data().post_date;
    category.textContent = "Category : " +  doc.data().category;
    tags.textContent = "Tags : " + doc.data().tags;
    summary.textContent = "Summary : \n\n " +  doc.data().summary;
    author.textContent = "by " + doc.data().author;
    content.textContent = "Content : \n\n" + doc.data().content;
    //Define button property
    button.onclick = function (event)
    {
        if (display_content)
        {
            button.textContent = "Read Less";
            content.style.display = "inline";
            display_content = false;
        }
        else
        {   
            button.textContent = "Read More";
            content.style.display = "none";
            display_content =true;
        }
    }
    //Add children to parent tag.
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(date);
    div.appendChild(category);
    div.appendChild(tags);
    div.appendChild(summary);
    div.appendChild(content);
    div.appendChild(button);
    div.setAttribute('class', 'unit_blog');
    //Add current blog to new child.
    all_blogs.appendChild(div);
}

db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach(document => {
        render_blog(document);
    });
})



write_button.onclick = function (event){
    event.preventDefault();
    window.open('add_new_blog.html');
}

summary_content_toggle.onclick = function (event){
    console.log("Hi");
}
