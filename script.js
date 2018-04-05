			var draggedId;
			function drag(ev){
				draggedId = ev.target.id;
			}
			function allowDrop (ev){
				ev.preventDefault(); // By default, data/elements cannot be dropped in other elements.
			}
			function drop (ev){
				ev.preventDefault(); // default handling of the data (default is open as link on drop)
				delete_note(draggedId);
			}
			function drawNote (id,myNote,date,color,textColor) {
				var note = document.createElement("div");
				var notes = document.getElementById("notes");
				note.innerHTML="<div>"+date+"</div><div>"+myNote+'</div><button style="margin-left:30%; margin-top:10px;height:30px;width:100px; border-radius:3px; font-size:20px;"onclick="delete_note('+id+')">delete</button>';
				note.style="border-radius:5px; width:300px; height:100px; margin-left: 40px; margin-top: 10px; padding:10px; font-size:20px; ";
				note.style.background=color;
				note.style.color=textColor;
				note.style.display="inline-block";
				note.id=id;
				note.draggable=true;
				note.ondragstart=drag;
				notes.appendChild(note);
			}
			function delete_note (id) {
				var notes = document.getElementById("notes");
				var note = document.getElementById(id);
				localStorage.removeItem(id);
				notes.removeChild(note);
			}
			function add () {
				var myNote = document.getElementById("myNote").value;
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				var color = document.getElementById("noteColor").value;
				var textColor = document.getElementById("textColor").value;
				if(dd<10) {
				    dd = '0'+dd
				} 
				if(mm<10) {
				    mm = '0'+mm
				} 
				today=mm+"/"+dd+"/"+yyyy;

				if(myNote.trim()=="")
					alert("you haven't written a note");
				else{
					var id=++length;
					var note = myNote+"-"+today+"-"+color+"-"+textColor;
					localStorage.setItem(id,note);
					drawNote(id,myNote,today,color,textColor);
					localStorage.setItem("length",length);
				}
			}
		
			if(localStorage.getItem("length")){
				var length=localStorage.getItem("length");
				for(i=1;i<=length;i++)
					if(localStorage.getItem(i)){
						var note = localStorage.getItem(i);
						var parts = note.split("-");
						drawNote(i,parts[0],parts[1],parts[2],parts[3]);
					}
			}
			else
				localStorage.setItem("length",0);
