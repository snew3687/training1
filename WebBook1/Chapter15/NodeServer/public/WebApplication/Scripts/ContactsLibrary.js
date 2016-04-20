$(document).ready(function() {
  
  contactsNamespace.clearForm();
  contactsNamespace.initialise();

  $(window).on('storage', contactsNamespace.handleStorageEvent);

  if ('onstorage' in document) { // Bind to document for IE8
    $(document).on('storage', contactsNamespace.handleStorageEvent);
  }
});

(function() {
  this.contactsNamespace = this.contactsNamespace || { };

  var ns= this.contactsNamespace;
  var currentRecord;

  ns.handleStorageEvent = function(e) {
    alert('New value stored - ' + e.originalEvent.newValue);
  };

  ns.initialise = function() {
    $('#btnSave').on('click', ns.save);
    ns.display();
  };
  
  ns.clearForm = function() {
    $(':input').val(''); //Clear all input fields
  };

  function retrieveFromStorage() {
    var contactsJSON = sessionStorage.getItem('contacts');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
  }

  ns.display = function() {
    $('#currentAction').html('Add Contact');
    currentRecord = { key: null, contact: {} };
    var results = retrieveFromStorage();
    bindToGrid(results);
  };

  function bindToGrid(results) {
    var html = '';
    for (var i = 0; i < results.length; i++) {
      var contact = results[i];
      html += '<tr><td>' + contact.emailAddress + '</td>';
      html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
      html += '<td>' + contact.phoneNumber + '</td>';
      html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
    }
    html = html || '<tr><td colspan="4">No records available</td></tr>';
    $('#contacts tbody').html(html);

    $('#contacts a.edit').on('click', ns.loadContact);
  }

  ns.loadContact = function() {
    var key = parseInt($(this).attr('data-key'));
    var results = retrieveFromStorage();
    $('#currentAction').html('Edit Contact');    
    currentRecord = { key: key, contact: results[key] };
    displayCurrentRecord();
  };

  function displayCurrentRecord() {
    var contact = currentRecord.contact;
    $('#firstName').val(contact.firstName);
    $('#lastName').val(contact.lastName);
    $('#emailAddress').val(contact.emailAddress);
    $('#phoneNumber').val(contact.phoneNumber);
  }

  ns.save = function() {
    var contact = currentRecord.contact;
    contact.firstName = $('#firstName').val();
    contact.lastName = $('#lastName').val();
    contact.emailAddress = $('#emailAddress').val();
    contact.phoneNumber = $('#phoneNumber').val();

    var results = retrieveFromStorage();
    
    if (currentRecord.key !== null) {
      results[currentRecord.key] = contact;
    }
    else {
      results.push(contact);
    }

    sessionStorage.setItem('contacts', JSON.stringify(results));
    ns.display();
  };


})();


