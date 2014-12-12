var express = require('express');
var bodyParser = require('body-parser');
var lti = require('ims-lti');
var URI = require('URIjs');

var app = express();
app.use(bodyParser.urlencoded({'extended': false}));

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Hello world app listening at http://%s:%s', host, port)

});

var nonces = [];

app.post('/launch', function (req, res) {
    console.log('*****************');
    console.log('Received launch request');
    console.log('*****************');
    console.log(req.body);

    ///////////////////////
    // Launch parameters //
    ///////////////////////

    // Always `basic-lti-launch-request`
    console.log('lti_message_type => ' + req.body.lti_message_type);
    // LTI version (e.g. LTI-1p0)
    console.log('lti_version => ' + req.body.lti_version);
    // Unique placement
    console.log('resource_link_id => ' + req.body.resource_link_id);
    // Context (e.g. course)
    console.log('context_id => ' + req.body.context_id);
    // User id (same across contexts, not apps)
    console.log('user_id => ' + req.body.user_id);
    // Canvas id for API calls
    console.log('custom_canvas_user_id => ' + req.body.custom_canvas_user_id);
    // Roles
    //  Nobody: `None` or `urn:lti:sysrole:ims/lis/None`
    //  Teacher/Instructor: `Instructor` or `urn:lti:instrole:ims/lis/Instructor`
    //  Student/Learner: `Learner` or `urn:lti:instrole:ims/lis/Learner` or `Student` or `urn:lti:instrole:ims/lis/Student`
    //  Designer: `ContentDeveloper` or `urn:lti:role:ims/lis/ContentDeveloper`
    //  Admin: `Administrator` or `urn:lti:instrole:ims/lis/Administrator`
    //  Teaching Assistant: `TeachingAssistant` or `urn:lti:role:ims/lis/TeachingAssistant` or `Mentor` or `urn:lti:instrole:ims/lis/Mentor`
    //  Observer/Auditor: `Observer` or `urn:lti:instrole:ims/lis/Observer`
    console.log('roles => ' + req.body.roles);
    // OAuth consumer key
    console.log('oauth_consumer_key => ' + req.body.oauth_consumer_key);
    // OAuth nonce. The LTI tool should keep a history of used nonces and not allow reuse of the nonce for multiple launches within 90 minutes
    console.log('oauth_nonce => ' + req.body.oauth_nonce);
    // OAuth timestamp. Used with the OAuth nonce for to prevent replay attacks. Should not be too old
    console.log('oauth_timestamp => ' + req.body.oauth_timestamp);
    // OAuth signature. Based on all other launch parameters
    console.log('oauth_signature => ' + req.body.oauth_signature);

    // Optional parameters
    // Full user name
    console.log('lis_person_name_full => ' + req.body.lis_person_name_full);
    // Primary email address
    console.log('lis_person_contact_email_primary => ' + req.body.lis_person_contact_email_primary);
    // Given name
    console.log('lis_person_name_given => ' + req.body.lis_person_name_given);
    // Family name
    console.log('lis_person_name_family => ' + req.body.lis_person_name_family);

    // Custom parameters will be prepended with `custom_`

    // Pass grades back to the consumer
    console.log('lis_outcome_service_url => ' + req.body.lis_outcome_service_url);
    console.log('*****************');

    ////////////////////////////
    // Signature verification //
    ////////////////////////////

    var provider = new lti.Provider(req.body.oauth_consumer_key, 'fdd97218b062c57c50f0f40bfbc0485e');
    provider.valid_request(req, function(err, isValid) {
        if (err || !isValid) {
            console.log(err);
            return res.status(500).send('The OAuth signature could not be validated');
        }

        ///////////////
        // Redirects //
        ///////////////

        var launch_presentation_return_url = new URI(req.body.launch_presentation_return_url);
        // Message to the user
        // launch_presentation_return_url.addQuery('lti_msg', 'Most things in here don\'t react well to bullets.');
        // Application log message
        // launch_presentation_return_url.addQuery('lti_log', 'One ping only.');
        // User visible error message
        // launch_presentation_return_url.addQuery('lti_errormsg', 'Who\'s going to save you, Junior?!');
        // Error message not visible to user
        // launch_presentation_return_url.addQuery('lti_errorlog', 'The floor\'s on fire... see... *&* the chair.');

        ////////////////////////
        // Content extensions //
        ////////////////////////

        // ['image', 'iframe', 'link', 'file', 'basic_lti', 'oembed']
        var ext_content_return_types = req.body.ext_content_return_types;
        // 'embed_content' => ['image', 'iframe', 'link', 'basic_lti', 'oembed']
        // 'select_link' => ['basic_lti']
        // 'submit_homework' => ['link', 'file']
        var selection_directive = req.body.selection_directive;

        // Send back a link
        // launch_presentation_return_url.addQuery('embed_type', 'link');
        // launch_presentation_return_url.addQuery('url', 'http://www.bacon.com');
        // launch_presentation_return_url.addQuery('text', 'bacon');

        // Send back an image
        // launch_presentation_return_url.addQuery('embed_type', 'image');
        // launch_presentation_return_url.addQuery('url', 'http://www.bacon.com/bacon.png');
        // launch_presentation_return_url.addQuery('alt', 'bacon');
        // launch_presentation_return_url.addQuery('width', '200');
        // launch_presentation_return_url.addQuery('height', '100');

        // Send back an iFrame
        // launch_presentation_return_url.addQuery('embed_type', 'iframe');
        // launch_presentation_return_url.addQuery('url', 'http://www.bacon.com');
        // launch_presentation_return_url.addQuery('width', '200');
        // launch_presentation_return_url.addQuery('height', '100');

        // Send back a file
        // launch_presentation_return_url.addQuery('embed_type', 'file');
        // launch_presentation_return_url.addQuery('url', 'http://www.bacon.com/bacon.docx');
        // launch_presentation_return_url.addQuery('text', 'bacon.docx');
        // launch_presentation_return_url.addQuery('content_type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        // Send back an LTI tool
        // launch_presentation_return_url.addQuery('embed_type', 'basic_lti');
        // launch_presentation_return_url.addQuery('url', 'http://www.bacon.com/bacon_launch');

        // Send back oEmbed
        // launch_presentation_return_url.addQuery('embed_type', 'oembed');
        // launch_presentation_return_url.addQuery('url', 'http://www.flickr.com/photos/bees/2341623661/');
        // launch_presentation_return_url.addQuery('endpoint', 'http://www.flickr.com/services/oembed/');

        res.send(req.body);
    });
});
