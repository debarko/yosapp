<!-- uservarification temporary  -->
<div id="varifyWindow">
	<div id="varifyWindowContainer">
		<div id="varifyWindowContainerHeader">VERIFICATION</div>
		<div id="progBarBg">
			<span class="progStepDot" id="fstStop">
				<div class="innerDisk"></div>
				<!-- first dialouge box -->
				<div class="stpDlgBox" id="stpDlgBox1">
					<div id="stpDlgBox1Container" class="verDialougeContainer">
						<div id="verHeaderStp1" class="verHeader">Choose Verifivation Method</div>
						<div id="verStp1Left" class="verStpLeft">
							<div id="verStp1LeftTop" class="verStpLeftTop"><p class="verText">Choose How verification code will be sent to you</p></div>
							<div id="verStp1LeftBottom" class="verStpLeftBottom"><p class="verText"></p><div id="verSelectedIcon"></div></div>
						</div>
						<div id="verStp1Right" class="verStpRight">
							<div id="verSMSWrapper" class="verMethodSelectionWrapper" onclick='verMethodSelect("sms");'>
								<div class="selectVerMethodCheckBox" id="selectSMS"></div>
								<div class="selectIcons" id="selectIconsSMS"></div>
								<div class="selectText" id="selectTextSMS"><p>SMS</p></div>
							</div>
							<div id="verVoiceWrapper" class="verMethodSelectionWrapper" onclick='verMethodSelect("voice");'>
								<div class="selectVerMethodCheckBox" id="selectVOICE"></div>
								<div class="selectIcons" id="selectIconsVOICE"></div>
								<div class="selectText" id="selectTextVOICE"><p>CALL</p></div>
							</div>
						</div>
						<div class="nextStpArrow"></div>
					</div>
				</div>
			</span>
			
			<span class="progStepDot" id="sndStop">
				<div class="innerDisk"></div>
				<div class="stpDlgBox" id="stpDlgBox2">
					<div id="stpDlgBox2Container" class="verDialougeContainer">
						<div id="verHeaderStp2" class="verHeader">Enter Verification Code</div>
						<div id="verStp2Left" class="verStpLeft">
							<div id="verStp2LeftTop" class="verStpLeftTop"><p class="verText verText2">Verification  code will be sent to your registered number shortly</p></div>
							<div id="verStp2LeftBottom" class="verStpLeftBottom"><p class="verText verText2">Hit resend if you did not get the code already</p></div>
						</div>
						<div id="verStp2Right" class="verStpRight">
							<div id="verStp2RightHeader"><p>Enter 6 digit code here</p></div>
							<div><input id="verCodeField" type="text" name="verCodeInput" /></div>
							<div id="verCodeOR">OR</div>	
							<div id="verResendCode"><p>Resend</p></div>
						</div>
						<div class="nextStpArrow"></div>
					</div>
				</div>
			</span>
			
			<span class="progStepDot" id="trdStop">
				<div class="innerDisk"></div>
				<div class="stpDlgBox" id="stpDlgBox3">
					<div id="stpDlgBox3Container" class="verDialougeContainer">
						<div id="verHeaderStp3" class="verHeader">Congratulation</div>
						<div id="verStp3Icon"></div>
						<div id="verStp3Text">Your verifucation completed successfully</div>
						<div class="nextStpArrow"></div>
					</div>
				</div>
			</span>

		</div>
	</div>
</div>