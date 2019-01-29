/* eslint-disable */
const paymentCalls =
  location.host !== 'localhost:3000'
    ? (function(window, document, utils, master, $) {
        var tabCCActive = true;

        var displayErrorMessage = function(errorMessages) {
          var cardValidationError = document.getElementById(
            'cardValidationError'
          );
          if (tabCCActive === false) {
            cardValidationError = document.getElementById(
              'odCardValidationError'
            );
          }
          if (cardValidationError !== null) {
            var msg = odApp.utils.template('#creditCardError', {
              errorMessage: errorMessages
            });
            cardValidationError.innerHTML = msg;
            cardValidationError.querySelector('.alert_dangerz').style.display =
              'block';
            cardValidationError.querySelector('.alert_dangerz').style.opacity =
              '1';
          }
        };

        var vantivSubmitHandler = function() {
          if (odApp.ui.creditCardIframe.checkExpirationDate()) {
            console.log('VANTIVE REQUEST 1.....');
            common_uielements.showAjaxLoadingInsideElement(
              '#service-Subscription-Pay',
              'Loading....'
            );
            // SEND CC TO VANTIV
            odApp.ui.creditCardIframe.sendRequest($('#orderNumber').val());
          }
        };

        var odccSubmitHandler = function() {
          common_uielements.showAjaxLoadingInsideElement(
            '#service-Subscription-Pay',
            'Loading....'
          );
          var creditCardNumber = $('#checkoutPLCCNumberField').val();
          creditCardNumber = creditCardNumber.replace(/\s/g, '');
          if (
            creditCardNumber === '' ||
            !(creditCardNumber.length == 15 || creditCardNumber.length == 16)
          ) {
            displayErrorMessage(
              'Please enter a valid Office Depot credit card number(15 or 16 characters).'
            );
            common_uielements.hideAjaxLoading();
            return;
          }
          var firstSix = creditCardNumber.substr(0, 6);
          var isPlccCard = odApp.utils.validate.checkPLCCBinRange(firstSix);
          if (!isPlccCard) {
            displayErrorMessage(
              'Your Office Depot credit card number is invalid.'
            );
            common_uielements.hideAjaxLoading();
            return;
          }
          /*var pay_eai = JSON.parse(sp_js);   PLCC/CreditCard Number
        pay_eai.updatePaymentInfoRequest.transactionHeader.consumer.consumerTransactionID = new Date().getTime();
        pay_eai.updatePaymentInfoRequest.customer.paymentDetails.paymentType = "PLCC";// required for EAI
        pay_eai.updatePaymentInfoRequest.customer.paymentDetails.paymentCard.cardNumber = creditCardNumber;
        console.log("VANTIVE REQUEST 2....." + pay_eai);*/
          eaiResponseHandler(creditCardNumber);
        };

        var eaiResponseHandler = function(pay_eai) {
          console.log('EDIT RESPONSE.....' + pay_eai);
          /* ODAssistant.submitPayment(eai_domain + "/subscription-management-async-broker/eaiapi/subscriptions/updatePaymentInformation", pay_eai).then(function(response) {
             if(response && response.updatePaymentInfoResponse && response.updatePaymentInfoResponse.transactionStatus.successfull){
                 resetPayment();
                 common_uielements.hideAjaxLoading();
                 document.getElementById("service-Subscription-Pay").classList.add("hide");
             } else {
                 resetPayment();
                 common_uielements.hideAjaxLoading();
                 displayErrorMessage("Updating payment has failed. Please try again.");
             }
         });*/
        };

        var eaiCallbacks = function() {
          // SET VANTIV SUCCESS CALLBACK
          window.odApp.ui.creditCardIframe.setSuccessCallback(function(
            response
          ) {
            console.log('Vantiv response', response);
            if (
              response.hasOwnProperty('firstSix') &&
              !odApp.utils.validate.checkPLCCBinRange(response.firstSix)
            ) {
              /*var pay_eai = JSON.parse(sp_js); cALL YOUR aJAX
                pay_eai.updatePaymentInfoRequest.customer.paymentDetails.paymentCard.cardLowValueToken = response.paypageRegistrationId;
                pay_eai.updatePaymentInfoRequest.customer.paymentDetails.paymentCard.cardType = getCardNameByType(response.type);
                pay_eai.updatePaymentInfoRequest.customer.paymentDetails.paymentCard.expirationDate = getExpDate();
                pay_eai.updatePaymentInfoRequest.transactionHeader.consumer.
                    = new Date().getTime();
                console.log('hhh');*/
              eaiResponseHandler(response.paypageRegistrationId);
            } else {
              showODCCTab();
              displayErrorMessage(
                'Please re-enter your Office Depot credit card number in the field below.'
              );
              resetIframe();
              common_uielements.hideAjaxLoading();
            }
          },
          '');

          // SET VANTIV ERROR CALLBACK
          odApp.ui.creditCardIframe.setErrorCallback(function(errorMessage) {
            displayErrorMessage(errorMessage);
            common_uielements.hideAjaxLoading();
          });

          // SET VANTIV FAILURE CALLBACK
          odApp.ui.creditCardIframe.setFailCallback(function(errorMessage) {
            displayErrorMessage(errorMessage);
            common_uielements.hideAjaxLoading();
          });
        };

        var getCardNameByType = function(cardType) {
          var cardName;
          switch (cardType.toString().toUpperCase()) {
            case 'VI':
              cardName = 'VISA';
              break;
            case 'MC':
              cardName = 'MASTERCARD';
              break;
            case 'DI':
              cardName = 'DISCOVER';
              break;
            case 'AX':
              cardName = 'AMEX';
              break;
            case 'SR':
              cardName = 'Office Depot';
              break;
            default:
              cardName = 'Unknown';
          }
          return cardName;
        };

        var getExpDate = function() {
          var mm = document.querySelector('.creditCardExpMonth').value;
          var yy = document.querySelector('.creditCardExpYear').value;
          return mm + yy;
        };

        var showODCCTab = function() {
          $('#payWithCreditCardModal, #creditCardPaymentTab').removeClass(
            'active_tab'
          );
          $('#payWithPLCCModal, #plccPaymentTab').addClass('active_tab');
          tabCCActive = false;
          removeErrMsgs();
        };

        var showCCTab = function() {
          $('#payWithPLCCModal, #plccPaymentTab').removeClass('active_tab');
          $('#payWithCreditCardModal, #creditCardPaymentTab').addClass(
            'active_tab'
          );
          tabCCActive = true;
          removeErrMsgs();
        };

        var removeErrMsgs = function() {
          $('.creditCardExpMonth').removeClass('error');
          $('.creditCardExpYear').removeClass('error');
          document.getElementById('cardValidationError').innerHTML = '';
          document.getElementById('odCardValidationError').innerHTML = '';
        };

        var resetIframe = function() {
          var $iFrame = $('#vantiv-payframe');
          if ($iFrame.length > 0) {
            $iFrame.attr('src', $iFrame.attr('src'));
          }
          $('.creditCardExpMonth').val(' ');
          $('.creditCardExpYear').val('');
        };

        // var resetPayment = function() {
        //   resetIframe();
        //   $('#checkoutPLCCNumberField').val('');
        //   showCCTab();
        // };

        var handleSaveCc = function() {
          $('#ssPaySave').on('click', function(e) {
            e.preventDefault();
            cmCreateManualLinkClickTag(
              '?cm_sp=myaccount-_-subscription-manager-_-services_subscription-details_payment-save'
            );
            if (tabCCActive) {
              vantivSubmitHandler();
            } else {
              odccSubmitHandler();
            }
          });

          // $('#ssPayCancel').on('click', function(e) {
          //   e.preventDefault();
          //   cmCreateManualLinkClickTag(
          //     '?cm_sp=myaccount-_-subscription-manager-_-services_subscription-details_payment-cancel'
          //   );
          //   resetPayment();
          //   document
          //     .getElementById('service-Subscription-Pay')
          //     .classList.add('hide');
          // });
        };

        var handleTabsToggle = function() {
          $('#plccPaymentTab').on('click', function(e) {
            e.preventDefault();
            cmCreateManualLinkClickTag(
              '?cm_sp=myaccount-_-subscription-manager-_-services_subscription-details_payment-edit_plcc-tab'
            );
            showODCCTab();
          });

          $('#payingWithODCard').on('click', function(e) {
            e.preventDefault();
            showODCCTab();
          });

          $('#creditCardPaymentTab').on('click', function(e) {
            e.preventDefault();
            cmCreateManualLinkClickTag(
              '?cm_sp=myaccount-_-subscription-manager-_-services_subscription-details_payment-edit_cc-tab'
            );
            showCCTab();
          });
        };

        var init = function init() {
          $('#checkoutPLCCNumberField')
            .removeAttr('data-numeric')
            .unbind('keyup')
            .attr('size', '19')
            .attr('maxlength', '20');
          handleSaveCc();
          handleTabsToggle();
          eaiCallbacks();
        };

        return {
          init: init
        };
      })(window, document, odApp.utils, odApp.ui.master, jQuery)
    : {};

export default paymentCalls;
