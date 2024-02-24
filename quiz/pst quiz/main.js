var quizTitle = "Pakistan Studies Quiz";
    
    var quizQuestions = [
        {
            "question"      :   "Who was the first President of the Constituent Assembly of Pakistan?",
           
            "choices"       :   [
                                "Liaquat Ali Khan",
                                "Quaid-e-Azam",
                                "Moulvi Tameez-ud-Din",
                                "Sardar Abdur Rab Nishtar"
            ],   
            "correct"       : "Quaid-e-Azam",
    
        },

        {
            "question"      :   "After how many years Pakistan got its first constitution?",
           
            "choices"       :   [
                                    "5 years",
                                    "7 years",
                                    "9 years",
                                    "11 years"
                                    
                                ],
            "correct"       :   "9 years",
           
        },
        {
            "question"      :   "What literary device is used when a non-human object is given human characteristics?",
           
            "choices"       :   [
                                    " Simile",
                                    "Metaphor",
                                    "Personification",
                                    "Hyperbole"
                                ],
            "correct"       :   "Personification",
            
        },

        {
            "question"      :   "What document was firstly drafted to give pace to constitution making process?",
           
            "choices"       :   [
                                    "Representative Act",
                                    "Pakistan Act",
                                    "Independence Act",
                                    "Objective Resolution"
                                    
                                ],
            "correct"       :   "Objective Resolution",
         
        },

        {
            "question"      :   "When Mohammad Ali Bogra presented Bogra Formula in the assembly?",
           
            "choices"       :   [
                                    "January 1953",
                                    " April 1953",
                                    " September 1953",
                                    "October 1953"
                                ],
            "correct"       :   "October 1953",
        
        },

       

        {
            "question"      :   "When the Constituent Assembly passed the Objective Resolution?",
           
            "choices"       :   [
                                    "14th February 1949",
                                    "12th March 1949",
                                    " 9th June 1949",
                                    "15th August 1949"
                                ],
            "correct"       :   "12th March 1949",
          
        },

        {
            "question"      :   "Who was Mohammad Ali Bogra? ",
          
            "choices"       :   [
                                    "Prime Minister",
                                    "Foreign Minister",
                                    "Loquacious. Law Minister",
                                    "Parliament Minister"
                                ],
            "correct"       :   "Prime Minister",
          
        },

        {
            "question"      :   "What is the other name of Mohammad Ali Bogra Formula?",
            
            "choices"       :   [
                                    "New Law of Pakistan",
                                    "Pakistan Report",
                                    " Third Report ",
                                    "Constitutional Formula"
                                ],
            "correct"       :   "Constitutional Formula",
         
        },

        {
            "question"      :   "When first constitution of Pakistan was enforced?",
            
            "choices"       :   [
                                    " 8th June 1956",
                                    "23rd March 1956",
                                    "14th August 1956",
                                    "25th December 1956"
                                ],
            "correct"       :   "23rd March 1956",
          
        },

        {
            "question"      :   "When did Fatima Jinnah joined All India Muslim league?",
           
            "choices"       :   [
                                    "1939",
                                    "1969",
                                    "1959",
                                    "1949"
                                ],
            "correct"       :   "1939",
           
        },

        
                        
    ];


    var currentQuestion = 0;
    var score = 0;
    var submt = true;
    var picked;
    
    jQuery(document).ready(function($){
    
        function htmlEncode(value){
            return $(document.createElement('div')).text(value).html();
        }
    
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
    
        function nextQuestion(){
            submt = true;
            $('#question').text(quizQuestions[currentQuestion]['question']);
            $('#pager').text('Question ' + Number(currentQuestion + 1) + ' of ' + quizQuestions.length);
            addChoices(quizQuestions[currentQuestion]['choices']);
            setupButtons();
        }
    
        function processQuestion(choice){
            if(quizQuestions[currentQuestion]['choices'][choice] == quizQuestions[currentQuestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
            }
            currentQuestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function(){
                if(currentQuestion == quizQuestions.length){
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            });
        }
    
        function setupButtons() {
            $('.choice').on('click', function() {
                picked = $(this).attr('data-index');
                $('.choice').removeClass('clicked'); // Remove clicked class from all choices
                $(this).addClass('clicked'); // Add clicked class to the selected choice
                if (submt) {
                    submt = false;
                    $('#submitbutton').css({
                        'color': 'white'
                    }).on('click', function() {
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            });
        }
    
        function endQuiz(){
            $('#question').empty();
            var remark = "";
            if (score >= 10){
                remark = "Excellent";
            } else if (score >= 8 && score < 10){
                remark = "Good";
            } else if (score >= 6 && score < 8){
                remark = "Improve yourself";
            } else {
                remark = "Very bad";
            }
            
            $('#choice-block').html('<center><p id="remark">' + remark + '</p></center>');
            $('#remark').addClass('remark-' + getRemarkClass(remark)); // Add class based on remark
            $('#submitbutton').remove();
            $('#question').text("You got " + score + " out of " + quizQuestions.length + " correct.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quizQuestions.length * 100) + '%').insertAfter('#question');
            $('#backBtn').show(); // Show the "Back to Main Page" button
        }
        
        // Function to get the class based on the remark
        function getRemarkClass(remark) {
            switch (remark) {
                case "Excellent":
                    return "excellent";
                case "Good":
                    return "good";
                case "Improve yourself":
                    return "improve";
                default:
                    return "bad";
            }
        }
        
    
        function init(){
           
            if(typeof quizTitle !== "undefined" && $.type(quizTitle) === "string"){
                $(document.createElement('h1')).text(quizTitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }
          
            if(typeof quizQuestions !== "undefined" && $.type(quizQuestions) === "array"){
               
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quizQuestions.length).appendTo('#frame');
               
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quizQuestions[0]['question']).appendTo('#frame');
                
                if(quizQuestions[0].hasOwnProperty('image') && quizQuestions[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quizQuestions[0]['image']).attr('alt', htmlEncode(quizQuestions[0]['question'])).appendTo('#frame');
                }
                                
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                addChoices(quizQuestions[0]['choices']);
            
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
        function processQuestion(choice) {
            const correctAnswerIndex = quizQuestions[currentQuestion]['choices'].indexOf(quizQuestions[currentQuestion]['correct']);
            const choices = document.querySelectorAll('.choice');
        
            if (choice == correctAnswerIndex) {
                choices[choice].style.backgroundColor = '#50D943'; // Green for correct answer
                score++;
            } else {
                choices[choice].style.backgroundColor = '#D92623'; // Red for wrong answer
                choices[correctAnswerIndex].style.backgroundColor = '#50D943'; // Highlight correct answer
            }
        
            currentQuestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function() {
                if (currentQuestion == quizQuestions.length) {
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({
                        'color': '#222'
                    }).off('click');
                    nextQuestion();
                }
            });
        }
    
        // Event handler for "Back to Main Page" button
        $('#backBtn').on('click', function() {
            window.location.href = "index.html"; // Replace "index.html" with your main page URL
        });
    });