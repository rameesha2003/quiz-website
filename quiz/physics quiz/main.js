var quizTitle = "Physics Quiz";
    
    var quizQuestions = [
        {
            "question"      :   "Momentum is the product of which two properties?",
           
            "choices"       :   [
                                    "acceleration and force",
                                    "mass and force",
                                    "mass and acceleration",
                                    "mass and velocity"
                                ],
            "correct"       :   "mass and velocity",
            
        },
        {
            "question"      :   "A newton is equal to which of following?",
           
            "choices"       :   [
                                    "kilogram per meter-second",
                                    "kilogram-meter per second squared",
                                    "kilogram-meter per second",
                                    "meter per second squared"
                                    
                                ],
            "correct"       :   "kilogram-meter per second squared",
           
        },
        {
            "question"      :   "Heat transfer by radiation occurs through what?",
           
            "choices"       :   [
                                    "electromagnetic waves",
                                    "atmospheric currents",
                                    "molecular and electronic collisions",
                                    "direct contact"
                                ],
            "correct"       :   "electromagnetic waves",
            
        },

        {
            "question"      :   "Which of the following is physical quantity that has magnitude but no direction?",
           
            "choices"       :   [
                                    "vector",
                                    "resultant",
                                    "scalar",
                                    "velocity"
                                    
                                ],
            "correct"       :   "scalar",
         
        },

        {
            "question"      :   "Which device stores and releases electrical charges?",
           
            "choices"       :   [
                                    "semiconductor",
                                    "resistor",
                                    "transistor",
                                    "capacitor"
                                ],
            "correct"       :   "capacitor",
        
        },

       

        {
            "question"      :   "The instrument that measures and records the relative humidity of air is ...",
           
            "choices"       :   [
                                    "hydrometer",
                                    "hygrometer",
                                    "lactometer",
                                    "barometer"
                                ],
            "correct"       :   "hygrometer",
          
        },

        {
            "question"      :   "The speed of light is equal to ____  x 10^8m/s.",
          
            "choices"       :   [
                                    "1.38",
                                    "3.00",
                                    "8.85",
                                    "6.63"
                                ],
            "correct"       :   "3.00",
          
        },

        {
            "question"      :   "A wave with a relatively long wavelength will also have ...",
            
            "choices"       :   [
                                    "a long period",
                                    "a high frequency",
                                    "a large amplitude",
                                    "a small amplitude"
                                ],
            "correct"       :   "a long period",
         
        },

        {
            "question"      :   "What is the energy process of our Sun?",
            
            "choices"       :   [
                                    "nuclear fusion",
                                    "nuclear radioactive decay",
                                    "nuclear fission",
                                    "nuclear electromagnetic spectrum"
                                ],
            "correct"       :   "nuclear fusion",
          
        },

        {
            "question"      :   "Which part of the electromagnetic spectrum has the shortest wavelength?",
           
            "choices"       :   [
                                    "visible light",
                                    "infrared",
                                    "gamma rays",
                                    "UV rays"
                                ],
            "correct"       :   "gamma rays",
           
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